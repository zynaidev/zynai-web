"use client";

import { useEffect, useRef } from "react";

/**
 * A landing hero hátterének interaktív pontrácsa.
 * Kizárólag dekoráció: a szöveg és a gombok nem függnek tőle,
 * a vászon nem fog el kattintást.
 */

type Pont = {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
};

const OSZTAS = 28;
const TULLOGAS = 40;
const HATOSUGAR = 160;
const MAX_ELTOLAS = 26;
const RUGO = 0.12;
const ALAP_SUGAR = 1;
const MAX_SUGAR = 2.2;
const ALAP_ALPHA = 0.1;
const MAX_ALPHA = 0.95;
const DPR_PLAFON = 2;
const MERET_KESLELTETES = 150;
const TAVOLI_KURZOR = -10_000;

function statikusRajz(szelesseg: number): boolean {
  const kevesMozgas = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const vanHover = window.matchMedia("(hover: hover)").matches;
  const elegSzeles = szelesseg >= 768;
  return kevesMozgas || !vanHover || !elegSzeles;
}

export function HeroGrid() {
  const vaszonRef = useRef<HTMLCanvasElement>(null);
  const pontokRef = useRef<Pont[]>([]);

  useEffect(() => {
    const vaszon = vaszonRef.current;
    const szulo = vaszon?.parentElement;
    const ctx = vaszon?.getContext("2d");
    if (!vaszon || !szulo || !ctx) return;

    let szelesseg = 0;
    let magassag = 0;
    let animacio = 0;
    let fut = false;
    let lathato = false;
    let statikus = true;
    let meretIdo = 0;
    let kurzorX = TAVOLI_KURZOR;
    let kurzorY = TAVOLI_KURZOR;

    const racsEpites = () => {
      const meret = szulo.getBoundingClientRect();
      szelesseg = meret.width;
      magassag = meret.height;
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_PLAFON);

      vaszon.width = Math.max(1, Math.floor(szelesseg * dpr));
      vaszon.height = Math.max(1, Math.floor(magassag * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const pontok: Pont[] = [];
      for (let y = -TULLOGAS; y <= magassag + TULLOGAS; y += OSZTAS) {
        for (let x = -TULLOGAS; x <= szelesseg + TULLOGAS; x += OSZTAS) {
          pontok.push({ baseX: x, baseY: y, x, y });
        }
      }
      pontokRef.current = pontok;
    };

    const statikusRacs = () => {
      ctx.clearRect(0, 0, szelesseg, magassag);
      ctx.fillStyle = "rgba(255,255,255,0.10)";
      for (const pont of pontokRef.current) {
        ctx.beginPath();
        ctx.arc(pont.baseX, pont.baseY, ALAP_SUGAR, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const kepkocka = (ido: number) => {
      if (!fut) return;

      ctx.clearRect(0, 0, szelesseg, magassag);

      for (const pont of pontokRef.current) {
        const hullamX = Math.sin(ido * 0.0006 + pont.baseX * 0.01) * 2;
        const hullamY = Math.cos(ido * 0.0005 + pont.baseY * 0.012) * 2;

        // A cél a nyugalmi hely plusz a lassú hullám. A kurzor csak
        // a hatósugáron belül tolja el ezt a célt.
        let celX = pont.baseX + hullamX;
        let celY = pont.baseY + hullamY;
        let erosseg = 0;

        const dx = pont.baseX - kurzorX;
        const dy = pont.baseY - kurzorY;
        const tavolsag = Math.hypot(dx, dy);

        if (tavolsag < HATOSUGAR && tavolsag > 0) {
          // A lineáris (1 - d/r) a sugár szélén túl hirtelen halna el,
          // a közepén pedig túl egyenletesen tolna. A négyzet a hatást
          // a kurzor közelébe sűríti: a szélén az erő közel nulla,
          // a kurzor alatt pedig eléri a 26 px-es maximumot.
          // Az irány a kurzortól a pont felé mutat, ezért a pont
          // kifelé mozdul, nem a kurzor alá gyűlik.
          erosseg = (1 - tavolsag / HATOSUGAR) ** 2;
          const eltolas = erosseg * MAX_ELTOLAS;
          celX += (dx / tavolsag) * eltolas;
          celY += (dy / tavolsag) * eltolas;
        } else if (tavolsag === 0) {
          erosseg = 1;
        }

        // Elsőrendű követés, sebességtag nélkül. Az új hely mindig
        // a jelenlegi és a cél között van (12%), ezért a pont nem
        // tud túllendülni a célon, és nem pattan vissza. Amikor a
        // kurzor elmegy, a cél visszaesik a hullámra, és ugyanez a
        // lépés simán oda húzza a pontot.
        pont.x += (celX - pont.x) * RUGO;
        pont.y += (celY - pont.y) * RUGO;

        const alpha = ALAP_ALPHA + (MAX_ALPHA - ALAP_ALPHA) * erosseg;
        const sugar = ALAP_SUGAR + (MAX_SUGAR - ALAP_SUGAR) * erosseg;
        ctx.fillStyle =
          erosseg > 0
            ? `rgba(190, 242, 100, ${alpha})`
            : "rgba(255,255,255,0.10)";
        ctx.beginPath();
        ctx.arc(pont.x, pont.y, sugar, 0, Math.PI * 2);
        ctx.fill();
      }

      animacio = window.requestAnimationFrame(kepkocka);
    };

    const inditas = () => {
      if (fut || statikus || !lathato) return;
      fut = true;
      animacio = window.requestAnimationFrame(kepkocka);
    };

    const leallitas = () => {
      fut = false;
      window.cancelAnimationFrame(animacio);
    };

    const onMozgas = (esemeny: MouseEvent) => {
      const meret = szulo.getBoundingClientRect();
      kurzorX = esemeny.clientX - meret.left;
      kurzorY = esemeny.clientY - meret.top;
    };

    const onTavozas = () => {
      kurzorX = TAVOLI_KURZOR;
      kurzorY = TAVOLI_KURZOR;
    };

    const modFrissites = () => {
      statikus = statikusRajz(szelesseg);
      szulo.removeEventListener("mousemove", onMozgas);
      szulo.removeEventListener("mouseleave", onTavozas);
      if (statikus) {
        leallitas();
        statikusRacs();
        return;
      }
      szulo.addEventListener("mousemove", onMozgas);
      szulo.addEventListener("mouseleave", onTavozas);
      statikusRacs();
      inditas();
    };

    racsEpites();
    modFrissites();

    const meretFigyelo = new ResizeObserver(() => {
      window.clearTimeout(meretIdo);
      meretIdo = window.setTimeout(() => {
        racsEpites();
        modFrissites();
      }, MERET_KESLELTETES);
    });
    meretFigyelo.observe(szulo);

    const lathatosag = new IntersectionObserver(([bejegyzes]) => {
      lathato = bejegyzes?.isIntersecting ?? false;
      if (lathato) inditas();
      else leallitas();
    });
    lathatosag.observe(szulo);

    return () => {
      leallitas();
      window.clearTimeout(meretIdo);
      szulo.removeEventListener("mousemove", onMozgas);
      szulo.removeEventListener("mouseleave", onTavozas);
      meretFigyelo.disconnect();
      lathatosag.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={vaszonRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
