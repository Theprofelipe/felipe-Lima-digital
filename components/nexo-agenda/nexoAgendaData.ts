import type { ActivityEntry, AgendaService, Booking, Professional, WaitlistEntry } from "./types";

export const professionals: Professional[] = [
  { id: "helena", name: "Helena Duarte", role: "Cortes e finalização", initials: "HD" },
  { id: "caio", name: "Caio Mendes", role: "Coloração e tratamentos", initials: "CM" },
  { id: "elisa", name: "Elisa Prado", role: "Imagem e design", initials: "EP" },
];

export const services: AgendaService[] = [
  { id: "corte", name: "Corte e finalização", durationMinutes: 60, price: 120 },
  { id: "cor", name: "Coloração consultiva", durationMinutes: 90, price: 240 },
  { id: "design", name: "Design de sobrancelhas", durationMinutes: 30, price: 70 },
  { id: "consultoria", name: "Consultoria de imagem", durationMinutes: 60, price: 180 },
];

const initialBookings: Booking[] = [
  {
    id: "na-2101",
    clientName: "Laura Menezes",
    contact: "Canal fictício · referência 01",
    serviceId: "corte",
    professionalId: "helena",
    day: "seg",
    startTime: "09:00",
    status: "Concluído",
    notes: "Preferência por camadas leves e finalização natural.",
    history: [
      { id: "history-2101-1", label: "Agendamento criado", detail: "Horário reservado para corte e finalização.", time: "Sex, 16:20" },
      { id: "history-2101-2", label: "Atendimento concluído", detail: "Serviço finalizado e registrado na agenda local.", time: "Seg, 10:05" },
    ],
  },
  {
    id: "na-2102",
    clientName: "Diego Antunes",
    contact: "Canal fictício · referência 02",
    serviceId: "cor",
    professionalId: "caio",
    day: "seg",
    startTime: "13:30",
    status: "Não compareceu",
    notes: "Primeira coloração; avaliação de tom prevista no início.",
    history: [
      { id: "history-2102-1", label: "Agendamento criado", detail: "Coloração reservada na agenda.", time: "Sex, 17:10" },
      { id: "history-2102-2", label: "Ausência registrada", detail: "Status alterado sem envio de mensagem externa.", time: "Seg, 14:00" },
    ],
  },
  {
    id: "na-2103",
    clientName: "Beatriz Moura",
    contact: "Canal fictício · referência 03",
    serviceId: "consultoria",
    professionalId: "elisa",
    day: "ter",
    startTime: "10:00",
    status: "Confirmado",
    notes: "Encontro inicial para alinhamento de estilo e rotina.",
    history: [
      { id: "history-2103-1", label: "Agendamento criado", detail: "Consultoria incluída na agenda.", time: "Seg, 11:12" },
      { id: "history-2103-2", label: "Presença confirmada", detail: "Confirmação simulada no painel.", time: "Seg, 15:40" },
    ],
  },
  {
    id: "na-2104",
    clientName: "Carolina Freitas",
    contact: "Canal fictício · referência 04",
    serviceId: "design",
    professionalId: "helena",
    day: "ter",
    startTime: "15:30",
    status: "Cancelado",
    notes: "Cliente solicitou remarcação para a próxima semana.",
    history: [
      { id: "history-2104-1", label: "Agendamento criado", detail: "Horário reservado localmente.", time: "Seg, 09:35" },
      { id: "history-2104-2", label: "Horário cancelado", detail: "Disponibilidade liberada para a lista de espera.", time: "Ter, 12:18" },
    ],
  },
  {
    id: "na-2105",
    clientName: "Amanda Torres",
    contact: "Canal fictício · referência 05",
    serviceId: "corte",
    professionalId: "helena",
    day: "qua",
    startTime: "08:00",
    status: "Confirmado",
    notes: "Preferência por acabamento natural e manutenção simples.",
    history: [
      { id: "history-2105-1", label: "Agendamento criado", detail: "Horário incluído na quarta-feira.", time: "Ter, 08:42" },
      { id: "history-2105-2", label: "Presença confirmada", detail: "Confirmação registrada nesta simulação.", time: "Ter, 16:10" },
    ],
  },
  {
    id: "na-2106",
    clientName: "Henrique Barros",
    contact: "Canal fictício · referência 06",
    serviceId: "cor",
    professionalId: "caio",
    day: "qua",
    startTime: "10:00",
    status: "Pendente",
    notes: "Avaliação de tom registrada antes do atendimento.",
    history: [
      { id: "history-2106-1", label: "Agendamento criado", detail: "Solicitação registrada no painel.", time: "Ter, 13:25" },
    ],
  },
  {
    id: "na-2107",
    clientName: "Natália Ribeiro",
    contact: "Canal fictício · referência 07",
    serviceId: "consultoria",
    professionalId: "elisa",
    day: "qua",
    startTime: "13:30",
    status: "Em atendimento",
    notes: "Sessão focada em combinações para a rotina profissional.",
    history: [
      { id: "history-2107-1", label: "Agendamento criado", detail: "Consultoria reservada.", time: "Ter, 10:14" },
      { id: "history-2107-2", label: "Presença confirmada", detail: "Cliente fictícia confirmou o horário.", time: "Qua, 09:05" },
      { id: "history-2107-3", label: "Atendimento iniciado", detail: "Status atualizado localmente.", time: "Agora" },
    ],
  },
  {
    id: "na-2108",
    clientName: "Rafael Lima",
    contact: "Canal fictício · referência 08",
    serviceId: "design",
    professionalId: "elisa",
    day: "qui",
    startTime: "09:00",
    status: "Confirmado",
    notes: "Preferência por resultado natural e desenho discreto.",
    history: [
      { id: "history-2108-1", label: "Agendamento criado", detail: "Horário incluído na quinta-feira.", time: "Ter, 17:22" },
      { id: "history-2108-2", label: "Presença confirmada", detail: "Confirmação simulada.", time: "Qua, 08:15" },
    ],
  },
  {
    id: "na-2109",
    clientName: "Sofia Martins",
    contact: "Canal fictício · referência 09",
    serviceId: "corte",
    professionalId: "helena",
    day: "qui",
    startTime: "14:30",
    status: "Pendente",
    notes: "Manter comprimento e priorizar leveza na finalização.",
    history: [
      { id: "history-2109-1", label: "Agendamento criado", detail: "Aguardando confirmação local.", time: "Qua, 09:40" },
    ],
  },
  {
    id: "na-2110",
    clientName: "Lucas Paiva",
    contact: "Canal fictício · referência 10",
    serviceId: "consultoria",
    professionalId: "elisa",
    day: "sex",
    startTime: "11:00",
    status: "Confirmado",
    notes: "Revisão de combinações e próximos ajustes de imagem.",
    history: [
      { id: "history-2110-1", label: "Agendamento criado", detail: "Horário incluído na sexta-feira.", time: "Qua, 10:05" },
      { id: "history-2110-2", label: "Presença confirmada", detail: "Confirmação registrada no painel.", time: "Qua, 11:32" },
    ],
  },
];

const initialWaitlist: WaitlistEntry[] = [
  { id: "wait-01", clientName: "Marina Coelho", contact: "Canal fictício · espera 01", serviceId: "corte", preferredProfessionalId: "helena", preferredDay: "Qualquer dia", preferredPeriod: "Tarde", createdLabel: "Aguarda há 2 dias" },
  { id: "wait-02", clientName: "Thiago Rocha", contact: "Canal fictício · espera 02", serviceId: "cor", preferredProfessionalId: "caio", preferredDay: "qui", preferredPeriod: "Manhã", createdLabel: "Aguarda desde ontem" },
  { id: "wait-03", clientName: "Isabela Moraes", contact: "Canal fictício · espera 03", serviceId: "design", preferredProfessionalId: "Qualquer profissional", preferredDay: "Qualquer dia", preferredPeriod: "Qualquer período", createdLabel: "Incluída hoje" },
];

const initialActivities: ActivityEntry[] = [
  { id: "activity-01", label: "Atendimento iniciado", detail: "Natália Ribeiro · Consultoria de imagem", time: "Agora", tone: "positive" },
  { id: "activity-02", label: "Confirmação registrada", detail: "Amanda Torres · Quarta, 08:00", time: "há 18 min", tone: "positive" },
  { id: "activity-03", label: "Horário cancelado", detail: "Carolina Freitas · Terça, 15:30", time: "há 1 h", tone: "attention" },
  { id: "activity-04", label: "Lista de espera atualizada", detail: "3 pessoas aguardam uma oportunidade", time: "há 2 h", tone: "neutral" },
];

export function createInitialBookings(): Booking[] {
  return initialBookings.map((booking) => ({
    ...booking,
    history: booking.history.map((entry) => ({ ...entry })),
  }));
}

export function createInitialWaitlist(): WaitlistEntry[] {
  return initialWaitlist.map((entry) => ({ ...entry }));
}

export function createInitialActivities(): ActivityEntry[] {
  return initialActivities.map((entry) => ({ ...entry }));
}
