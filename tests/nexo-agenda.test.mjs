import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  createInitialActivities,
  createInitialBookings,
  createInitialWaitlist,
  professionals,
  services,
} from "../components/nexo-agenda/nexoAgendaData.ts";
import {
  DEFAULT_FILTERS,
  buildReminderMessage,
  calculateAgendaMetrics,
  createBooking,
  filterBookings,
  getWaitlistMatches,
  hasBookingConflict,
  updateBookingStatus,
  validateBookingDraft,
} from "../components/nexo-agenda/nexoAgendaLogic.ts";

const validDraft = {
  clientName: "Cliente de teste",
  contact: "Contato fictício de teste",
  serviceId: "corte",
  professionalId: "helena",
  day: "qua",
  startTime: "10:00",
  notes: "Reserva criada somente para o teste local.",
};

test("detects duration-aware conflicts for the same professional", () => {
  const bookings = createInitialBookings();

  assert.equal(hasBookingConflict(bookings, {
    day: "qua",
    startTime: "11:00",
    professionalId: "caio",
    serviceId: "cor",
  }, services), true);
  assert.equal(hasBookingConflict(bookings, {
    day: "qua",
    startTime: "11:00",
    professionalId: "elisa",
    serviceId: "cor",
  }, services), false);
});

test("filters the agenda by day, professional, service and status", () => {
  const bookings = createInitialBookings();

  assert.deepEqual(filterBookings(bookings, DEFAULT_FILTERS).map((booking) => booking.id), ["na-2105", "na-2106", "na-2107"]);
  assert.deepEqual(filterBookings(bookings, { ...DEFAULT_FILTERS, professionalId: "caio" }).map((booking) => booking.id), ["na-2106"]);
  assert.deepEqual(filterBookings(bookings, { ...DEFAULT_FILTERS, serviceId: "consultoria" }).map((booking) => booking.id), ["na-2107"]);
  assert.deepEqual(filterBookings(bookings, { ...DEFAULT_FILTERS, status: "Confirmado" }).map((booking) => booking.id), ["na-2105"]);
  assert.deepEqual(filterBookings(bookings, { ...DEFAULT_FILTERS, day: "qui" }).map((booking) => booking.id), ["na-2108", "na-2109"]);
});

test("validates required fields and rejects an occupied slot", () => {
  const bookings = createInitialBookings();
  const emptyErrors = validateBookingDraft({
    clientName: "",
    contact: "",
    serviceId: "",
    professionalId: "",
    day: "qua",
    startTime: "",
    notes: "",
  }, bookings, services);

  assert.deepEqual(Object.keys(emptyErrors).sort(), ["clientName", "contact", "professionalId", "serviceId", "startTime"]);

  const result = createBooking(bookings, {
    ...validDraft,
    serviceId: "cor",
    professionalId: "caio",
    startTime: "11:00",
  }, services);
  assert.equal(result.ok, false);
  assert.match(result.message, /já possui um atendimento/i);
});

test("creates a pending booking with a local history entry", () => {
  const result = createBooking(createInitialBookings(), validDraft, services, "na-test-01");

  assert.equal(result.ok, true);
  assert.equal(result.booking.id, "na-test-01");
  assert.equal(result.booking.status, "Pendente");
  assert.equal(result.booking.clientName, "Cliente de teste");
  assert.match(result.booking.history[0].label, /Agendamento criado/);
  assert.match(result.booking.history[0].detail, /localmente/);
});

test("allows only coherent status transitions and records their history", () => {
  const pending = createBooking(createInitialBookings(), validDraft, services, "na-test-02");
  assert.equal(pending.ok, true);

  const invalid = updateBookingStatus(pending.booking, "Concluído");
  assert.equal(invalid.changed, false);
  assert.equal(invalid.booking.status, "Pendente");

  const confirmed = updateBookingStatus(pending.booking, "Confirmado");
  assert.equal(confirmed.changed, true);
  assert.equal(confirmed.booking.status, "Confirmado");
  assert.match(confirmed.booking.history.at(-1).label, /Confirmado/);

  const cancelled = updateBookingStatus(confirmed.booking, "Cancelado");
  assert.equal(cancelled.changed, true);
  assert.equal(cancelled.booking.status, "Cancelado");
  assert.equal(cancelled.booking.history.length, pending.booking.history.length + 2);
});

test("recalculates operational metrics after creation and cancellation", () => {
  const bookings = createInitialBookings();
  const waitlist = createInitialWaitlist();

  assert.deepEqual(calculateAgendaMetrics(bookings, waitlist, "qua", professionals.length), {
    scheduledToday: 3,
    confirmedToday: 2,
    occupancyRate: 13,
    cancelledOrMissed: 2,
    waitlistCount: 3,
  });

  const created = createBooking(bookings, validDraft, services, "na-test-03");
  assert.equal(created.ok, true);
  const withBooking = [...bookings, created.booking];
  assert.deepEqual(calculateAgendaMetrics(withBooking, waitlist, "qua", professionals.length), {
    scheduledToday: 4,
    confirmedToday: 2,
    occupancyRate: 17,
    cancelledOrMissed: 2,
    waitlistCount: 3,
  });

  const confirmed = updateBookingStatus(created.booking, "Confirmado");
  const cancelled = updateBookingStatus(confirmed.booking, "Cancelado");
  const afterCancellation = withBooking.map((booking) => booking.id === cancelled.booking.id ? cancelled.booking : booking);
  assert.deepEqual(calculateAgendaMetrics(afterCancellation, waitlist, "qua", professionals.length), {
    scheduledToday: 3,
    confirmedToday: 2,
    occupancyRate: 13,
    cancelledOrMissed: 3,
    waitlistCount: 3,
  });
});

test("builds a local reminder and matches a released slot to the waitlist", () => {
  const booking = createInitialBookings().find((item) => item.id === "na-2104");
  assert.ok(booking);

  const reminder = buildReminderMessage(booking, services, professionals);
  assert.match(reminder, /Carolina Freitas/);
  assert.match(reminder, /Design de sobrancelhas/);
  assert.match(reminder, /Terça-feira, 19 ago, às 15:30/);
  assert.match(reminder, /Helena Duarte/);
  assert.match(reminder, /nenhuma mensagem foi enviada/);
  assert.doesNotMatch(reminder, /https?:\/\/|wa\.me|\+?\d{10,}/i);

  assert.deepEqual(getWaitlistMatches(createInitialWaitlist(), booking).map((entry) => entry.id), ["wait-03"]);
});

test("restores independent copies of all initial demonstration data", () => {
  const bookings = createInitialBookings();
  const waitlist = createInitialWaitlist();
  const activities = createInitialActivities();
  bookings[0].status = "Cancelado";
  bookings[0].history[0].label = "Alterado";
  waitlist[0].clientName = "Alterado";
  activities[0].label = "Alterado";

  assert.equal(createInitialBookings()[0].status, "Concluído");
  assert.equal(createInitialBookings()[0].history[0].label, "Agendamento criado");
  assert.equal(createInitialWaitlist()[0].clientName, "Marina Coelho");
  assert.equal(createInitialActivities()[0].label, "Atendimento iniciado");
});

test("keeps Nexo Agenda local, fictitious and free of external calls", async () => {
  const paths = [
    "../components/NexoAgendaDemo.tsx",
    "../components/nexo-agenda/nexoAgendaData.ts",
    "../components/nexo-agenda/nexoAgendaLogic.ts",
    "../components/nexo-agenda/NexoAgendaBookingForm.tsx",
    "../components/nexo-agenda/NexoAgendaCalendar.tsx",
    "../components/nexo-agenda/NexoAgendaDetails.tsx",
    "../components/nexo-agenda/NexoAgendaFilters.tsx",
    "../components/nexo-agenda/NexoAgendaHeader.tsx",
    "../components/nexo-agenda/NexoAgendaMetrics.tsx",
    "../components/nexo-agenda/NexoAgendaTimeline.tsx",
    "../components/nexo-agenda/NexoAgendaWaitlist.tsx",
  ];
  const sources = await Promise.all(paths.map((path) => readFile(new URL(path, import.meta.url), "utf8")));
  const implementation = sources.join("\n");

  assert.match(implementation, /Dados fictícios|contatos fictícios|Contato fictício/i);
  assert.match(implementation, /navigator\.clipboard/);
  assert.match(implementation, /createInitialBookings/);
  assert.match(implementation, /setBookings\(createInitialBookings\(\)\)/);
  assert.doesNotMatch(implementation, /\bfetch\s*\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage|WebSocket|window\.open|https?:\/\/|wa\.me/i);
  assert.doesNotMatch(implementation, /@[a-z0-9.-]+\.[a-z]{2,}|\+?\d{10,}/i);
});

test("includes responsive, keyboard-focus and reduced-motion safeguards", async () => {
  const css = await readFile(new URL("../app/projetos/nexo-agenda/nexo-agenda.css", import.meta.url), "utf8");

  assert.match(css, /\.nexo-demo-shell button:focus-visible/);
  assert.match(css, /outline: 3px solid/);
  assert.match(css, /min-height: 44px/);
  assert.match(css, /@media \(max-width: 720px\)/);
  assert.match(css, /@media \(max-width: 340px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});

test("integrates Nexo Agenda into the project data, home showcase and sitemap", async () => {
  const paths = [
    "../data/site.ts",
    "../components/ProjectsCarousel.tsx",
    "../app/sitemap.xml/route.ts",
  ];
  const sources = await Promise.all(paths.map((path) => readFile(new URL(path, import.meta.url), "utf8")));

  for (const source of sources) assert.match(source, /nexo-agenda|Nexo Agenda/i);
  assert.match(sources[0], /detailUrl: "\/projetos\/nexo-agenda"/);
  assert.match(sources[1], /\["fieldops", "nexo-agenda"\]/);
  assert.match(sources[1], /project\.visual === "nexo"/);
  assert.match(sources[2], /"\/projetos\/nexo-agenda"/);
});

test("server-renders the isolated Nexo Agenda route", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-nexo-agenda`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("https://felipe-lima.test/projetos/nexo-agenda", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Nexo Agenda/);
  assert.match(html, /Agenda organizada/);
  assert.match(html, /Demonstração interativa/);
  assert.match(html, /Agenda da Casa Lume/);
  assert.match(html, /Dados fictícios/);
  assert.match(html, /O que esta demonstração faz/);
  assert.match(html, /O que uma versão real poderia integrar/);
  assert.match(html, /O que não está ativo aqui/);
  assert.match(html, /Solicitar solução semelhante/);
});
