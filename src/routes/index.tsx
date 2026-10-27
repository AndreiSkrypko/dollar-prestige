import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import guilloche from "@/assets/guilloche.jpg";
import { MoneyCursor, Tilt, Magnetic, CountUp } from "@/components/money-fx";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SoftDeal — задания с готовым ТЗ, оплата в USDT" },
      { name: "description", content: "Берите задания с готовым ТЗ и чек-листом. Платформа платит в USDT за принятую работу — без комиссий." },
      { property: "og:title", content: "SoftDeal — платформа платит за принятую работу" },
      { property: "og:description", content: "Задания с ТЗ, чек-листом приёмки и фиксированным вознаграждением в USDT." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const stack = ["Next.js", "React", "Node.js", "Python", "Go", "PostgreSQL", "React Native", "Expo", "Telegram-боты", "FastAPI", "Docker", "AWS", "Webflow", "Astro"];
const steps = [
  { n: "I", t: "Выберите задание", d: "Полное ТЗ, примеры и чек-лист приёмки. Сумма и срок видны сразу." },
  { n: "II", t: "Откликнитесь", d: "Опишите подход и срок. Команда отвечает в чате и выбирает исполнителя." },
  { n: "III", t: "Сделайте и сдайте", d: "Чат, файлы и передача кода — в одном контракте. Сдаёте по чек-листу." },
  { n: "IV", t: "Получите выплату", d: "После приёмки — вся сумма в USDT (TRC-20). Без комиссий." },
];
const tasks = [
  { t: "Панель диспетчера для службы доставки", r: 600, d: 7, tag: "React · Node.js" },
  { t: "Telegram-бот записи к врачу", r: 500, d: 8, tag: "Python · aiogram" },
  { t: "Лендинг клиники с формой заявки", r: 400, d: 9, tag: "Astro · Tailwind" },
];
const faq = [
  { q: "Кто пишет задания?", a: "Команда SoftDeal. Никаких заказчиков, торга и оценок — сумма зафиксирована заранее." },
  { q: "Как приходят деньги?", a: "В USDT на TRON (TRC-20) после приёмки по чек-листу. 1 USDT ≈ $1." },
  { q: "Есть ли комиссия?", a: "Нет. Вы получаете всю сумму, указанную в задании." },
  { q: "Когда начинается срок?", a: "С момента, когда вас выбрали исполнителем." },
];

function Bill({ amount, className = "" }: { amount: number; className?: string }) {
  return (
    <div className={`grain relative aspect-[2.35/1] overflow-hidden rounded-xl border border-gold/40 bg-bill shadow-deep ${className}`}>
      <img src={guilloche} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-luminosity" />
      <div className="absolute inset-2 rounded-lg border border-gold/30" />
      <div className="absolute inset-0 flex items-center justify-between px-6">
        <span className="font-display text-4xl text-gold-gradient">${amount}</span>
        <div className="grid h-16 w-16 place-items-center rounded-full border border-gold/50 guilloche-lines">
          <span className="font-display text-2xl text-gold">$</span>
        </div>
        <span className="font-display text-4xl text-gold-gradient">{amount}</span>
      </div>
      <span className="absolute bottom-3 left-6 font-mono text-[9px] tracking-[0.3em] text-gold/70">SOFTDEAL · TRC-20 · SD{amount}0124</span>
      <div className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-gold-soft/25 to-transparent animate-shine" />
    </div>
  );
}

function Index() {
  const [earned, setEarned] = useState(0);
  const onEarn = useCallback((n: number) => setEarned((e) => e + n), []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <MoneyCursor onEarn={onEarn} />

      {/* Wallet counter */}
      <div className="fixed bottom-6 left-6 z-50 rounded-2xl border border-gold/30 bg-card/80 px-5 py-3 backdrop-blur-xl shadow-gold">
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Кликайте — копите</p>
        <p className="font-mono text-2xl font-bold text-gold-gradient">${earned.toLocaleString("ru-RU")}</p>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="font-display text-2xl"><span className="text-gold-gradient">$</span>oft<em className="text-gold">Deal</em></a>
          <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
            {["Как это работает", "Задания", "Оплата", "Вопросы"].map((l, i) => (
              <a key={l} href={["#how", "#tasks", "#pay", "#faq"][i]} className="transition-colors hover:text-gold">{l}</a>
            ))}
          </nav>
          <a href="#tasks" className="rounded-full bg-gold-gradient px-5 py-2 text-sm font-semibold text-primary-foreground shadow-gold">Начать</a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <img src={guilloche} alt="" width={1600} height={1024} className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 pb-28 pt-20 lg:grid-cols-[1.15fr_1fr] lg:pt-28">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" /> ТЗ готово · оплата в USDT
            </p>
            <h1 className="mt-8 font-display text-5xl font-light leading-[1.02] tracking-tight md:text-7xl">
              Берите задания<br />с готовым ТЗ —<br />
              <span className="italic text-gold-gradient">платформа платит</span><br />за принятую работу
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Не нужно искать заказчиков и торговаться. Откликаетесь, делаете, сдаёте по чек-листу — и получаете вознаграждение, указанное в задании.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic href="#tasks" className="group rounded-full bg-gold-gradient px-8 py-4 font-semibold text-primary-foreground shadow-gold">
                Начать зарабатывать <span className="transition-transform group-hover:translate-x-1">→</span>
                <span className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-gold-soft/70 to-transparent animate-shine" />
              </Magnetic>
              <a href="#how" className="rounded-full border border-gold/30 px-8 py-4 text-foreground transition-colors hover:border-gold hover:text-gold">Как это работает</a>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">Кликните в любом месте страницы — посмотрите, что будет.</p>
          </div>

          <div className="relative">
            <Bill amount={100} className="absolute -right-6 -top-10 w-64 rotate-12 opacity-70 animate-floaty" />
            <Tilt className="rounded-3xl">
              <div className="rounded-3xl border border-gold/25 bg-card/90 p-7 backdrop-blur-xl shadow-deep">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Задание #124 · <span className="text-accent">● В работе</span></p>
                    <p className="mt-2 font-display text-xl">Панель диспетчера для службы доставки</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Награда</p>
                    <p className="font-mono text-2xl font-bold text-gold-gradient">500 USDT</p>
                  </div>
                </div>
                <div className="mt-7 grid grid-cols-4 gap-2 text-center text-xs">
                  {["Отклик", "Разработка", "Приёмка", "Выплата"].map((s, i) => (
                    <div key={s}>
                      <div className={`mx-auto h-1.5 rounded-full ${i < 2 ? "bg-gold-gradient" : "bg-muted"}`} />
                      <p className={`mt-2 ${i < 2 ? "text-foreground" : "text-muted-foreground"}`}>{s}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-7 space-y-3 rounded-2xl border border-border bg-background/50 p-5 text-sm">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Чек-лист приёмки</p>
                  {[["Основные функции работают", "Готово"], ["Развёрнуто на демо-сервере", "Проверка"], ["Код и доступы переданы", "Впереди"]].map(([a, b], i) => (
                    <div key={a} className="flex items-center justify-between">
                      <span className="flex items-center gap-3"><span className={`grid h-4 w-4 place-items-center rounded border ${i === 0 ? "border-gold bg-gold text-primary-foreground" : "border-border"}`}>{i === 0 && "✓"}</span>{a}</span>
                      <span className="text-xs text-muted-foreground">{b}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 grid grid-cols-3 divide-x divide-border rounded-2xl border border-border text-center">
                  {[["500", "USDT вам"], ["7", "дней"], ["0", "комиссия"]].map(([a, b]) => (
                    <div key={b} className="py-4"><p className="font-mono text-xl text-gold">{a}</p><p className="text-xs text-muted-foreground">{b}</p></div>
                  ))}
                </div>
              </div>
            </Tilt>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-14 md:grid-cols-4">
          {[
            { v: <CountUp to={500} prefix="$" />, l: "типичное вознаграждение" },
            { v: <CountUp to={0} suffix="%" />, l: "комиссия для разработчика" },
            { v: <CountUp to={7} suffix=" дн." />, l: "типичный срок" },
            { v: <>1 USDT ≈ $1</>, l: "выплата в TRC-20" },
          ].map((s, i) => (
            <div key={i}><p className="font-display text-4xl text-gold-gradient md:text-5xl">{s.v}</p><p className="mt-2 text-sm text-muted-foreground">{s.l}</p></div>
          ))}
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden py-8">
        <div className="flex w-max animate-marquee gap-10 font-display text-2xl italic text-muted-foreground/60">
          {[...stack, ...stack].map((s, i) => <span key={i} className="flex items-center gap-10">{s}<span className="text-gold">$</span></span>)}
        </div>
      </div>

      {/* How */}
      <section id="how" className="mx-auto max-w-7xl px-6 py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Процесс</p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl font-light md:text-6xl">Четыре шага от задания <span className="italic text-gold-gradient">до выплаты</span></h2>
        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="group relative bg-background p-8 transition-colors hover:bg-card">
              <span className="font-display text-6xl italic text-gold/30 transition-colors group-hover:text-gold">{s.n}</span>
              <h3 className="mt-8 font-display text-2xl">{s.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tasks */}
      <section id="tasks" className="mx-auto max-w-7xl px-6 pb-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-4xl font-light md:text-6xl">Открытые <span className="italic text-gold-gradient">задания</span></h2>
          <p className="max-w-sm text-muted-foreground">Наведите на карточку — каждое задание это реальная купюра в вашем кошельке.</p>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {tasks.map((t) => (
            <Tilt key={t.t} className="rounded-3xl">
              <div className="group rounded-3xl border border-border bg-card p-6 transition-colors hover:border-gold/50">
                <Bill amount={t.r} className="transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-[-2deg]" />
                <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">{t.tag}</p>
                <h3 className="mt-2 font-display text-xl">{t.t}</h3>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm">
                  <span className="font-mono text-gold">{t.r} USDT</span>
                  <span className="text-muted-foreground">{t.d} дней · ТЗ · чек-лист</span>
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </section>

      {/* Pay */}
      <section id="pay" className="relative overflow-hidden border-y border-border">
        <img src={guilloche} alt="" loading="lazy" width={1600} height={1024} className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-28 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Оплата</p>
            <h2 className="mt-4 font-display text-4xl font-light md:text-6xl">Вся сумма. <span className="italic text-gold-gradient">Без комиссий.</span></h2>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">Выплата в USDT на TRON (TRC-20) сразу после приёмки работы по чек-листу. Сумма зафиксирована в задании до старта.</p>
          </div>
          <Tilt className="mx-auto w-full max-w-lg rounded-xl"><Bill amount={500} /></Tilt>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-6 py-28">
        <h2 className="text-center font-display text-4xl font-light md:text-5xl">Вопросы</h2>
        <div className="mt-12 divide-y divide-border border-y border-border">
          {faq.map((f) => (
            <details key={f.q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between font-display text-xl">
                {f.q}<span className="text-gold transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-28">
        <div className="grain relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-gold/30 bg-bill px-8 py-20 text-center shadow-deep">
          <div className="absolute inset-0 guilloche-lines opacity-60" />
          <div className="relative">
            <h2 className="font-display text-4xl font-light md:text-6xl">Ваш следующий <span className="italic text-gold-gradient">$500</span><br />уже ждёт в ленте</h2>
            <div className="mt-10"><Magnetic href="#tasks" className="rounded-full bg-gold-gradient px-10 py-4 font-semibold text-primary-foreground shadow-gold">Смотреть задания →</Magnetic></div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">
        © 2026 <span className="font-display text-foreground">$oftDeal</span> · Выплаты в USDT (TRC-20)
      </footer>
    </div>
  );
}
