import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { createInitialOrders } from "../components/fieldops/fieldOpsData.ts";
import {
  EMPTY_FILTERS,
  advanceOrder,
  assessDeadlineRisk,
  calculateMetrics,
  filterOrders,
  releaseOrderMaterial,
} from "../components/fieldops/fieldOpsLogic.ts";

test("filters fictitious orders by service, code, status, priority and region", () => {
  const orders = createInitialOrders();

  assert.equal(filterOrders(orders, { ...EMPTY_FILTERS, search: "fo-1042" })[0].service, "Inspeção técnica");
  assert.equal(filterOrders(orders, { ...EMPTY_FILTERS, search: "manutencao" })[0].code, "FO-1043");
  assert.deepEqual(filterOrders(orders, { ...EMPTY_FILTERS, status: "Em deslocamento" }).map((order) => order.code), ["FO-1043"]);
  assert.deepEqual(filterOrders(orders, { ...EMPTY_FILTERS, priority: "Urgente" }).map((order) => order.code), ["FO-1042", "FO-1047"]);
  assert.deepEqual(filterOrders(orders, { ...EMPTY_FILTERS, region: "Centro" }).map((order) => order.code), ["FO-1042", "FO-1047"]);
  assert.equal(filterOrders(orders, EMPTY_FILTERS).length, orders.length);
});

test("calculates deadline risk and dashboard indicators from transparent rules", () => {
  const orders = createInitialOrders();
  const critical = orders.find((order) => order.code === "FO-1042");
  const completed = orders.find((order) => order.code === "FO-1045");

  assert.ok(critical);
  assert.ok(completed);
  assert.deepEqual(assessDeadlineRisk(critical), {
    atRisk: true,
    score: 9,
    signals: [
      "prioridade urgente (+3)",
      "prazo em até 2 horas (+2)",
      "sem atualização há 3 horas ou mais (+2)",
      "material aguardando liberação (+2)",
    ],
  });
  assert.deepEqual(assessDeadlineRisk(completed), { atRisk: false, score: 0, signals: [] });
  assert.deepEqual(calculateMetrics(orders), { open: 5, enRoute: 1, inService: 2, atRisk: 3, completed: 1 });
});

test("requires material release, progresses status, updates history and supports a full reset", () => {
  const initial = createInitialOrders();
  const pending = initial.find((order) => order.code === "FO-1042");
  assert.ok(pending);

  const blocked = advanceOrder(pending);
  assert.equal(blocked.changed, false);
  assert.match(blocked.message, /Libere o material/);
  assert.equal(blocked.order.status, "Agendada");

  const released = releaseOrderMaterial(pending);
  assert.equal(released.changed, true);
  assert.equal(released.order.materialReleased, true);
  assert.ok(released.order.materials.every((material) => material.status === "Disponível"));
  assert.match(released.order.history.at(-1).label, /Material liberado/);

  const progressed = advanceOrder(released.order);
  assert.equal(progressed.changed, true);
  assert.equal(progressed.order.status, "Em deslocamento");
  assert.match(progressed.order.history.at(-1).label, /Em deslocamento/);

  const changedOrders = initial.map((order) => order.id === progressed.order.id ? progressed.order : order);
  assert.deepEqual(calculateMetrics(changedOrders), { open: 5, enRoute: 2, inService: 2, atRisk: 3, completed: 1 });

  const restored = createInitialOrders();
  assert.equal(restored.find((order) => order.code === "FO-1042")?.status, "Agendada");
  assert.equal(restored.find((order) => order.code === "FO-1042")?.materialReleased, false);
});

test("keeps the FieldOps demo local, fictitious and free of external calls", async () => {
  const paths = [
    "../components/FieldOpsDemo.tsx",
    "../components/fieldops/fieldOpsData.ts",
    "../components/fieldops/fieldOpsLogic.ts",
    "../components/fieldops/FieldOpsFilters.tsx",
    "../components/fieldops/FieldOpsMetrics.tsx",
    "../components/fieldops/FieldOpsOrderList.tsx",
    "../components/fieldops/FieldOpsOrderDetails.tsx",
    "../components/fieldops/FieldOpsTimeline.tsx",
  ];
  const sources = await Promise.all(paths.map((path) => readFile(new URL(path, import.meta.url), "utf8")));
  const implementation = sources.join("\n");

  assert.match(implementation, /Dados fictícios/);
  assert.match(implementation, /createInitialOrders/);
  assert.match(implementation, /setOrders\(createInitialOrders\(\)\)/);
  assert.doesNotMatch(implementation, /\bfetch\s*\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage|WebSocket|https?:\/\/|wa\.me/i);
  assert.doesNotMatch(implementation, /@[a-z0-9.-]+\.[a-z]{2,}|\+?\d{10,}/i);
});

test("includes visible focus, touch-friendly controls and reduced-motion safeguards", async () => {
  const css = await readFile(new URL("../app/projetos/fieldops/fieldops.css", import.meta.url), "utf8");

  assert.match(css, /\.fieldops-order-list > button:focus-visible/);
  assert.match(css, /outline: 3px solid/);
  assert.match(css, /min-height: 43px/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /@media \(max-width: 720px\)/);
  assert.doesNotMatch(css, /cursor:\s*url\(/i);
});
