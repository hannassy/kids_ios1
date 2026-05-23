/**
 * quizScoring.js — подсчёт баллов и решение: сразу результат или выбор между двумя факультетами.
 *
 * Правило «60 / 40»: если у лидера ~60% всех баллов, у второго ~40% —
 * шляпа «колеблется», пользователь сам выбирает факультет.
 */

const HOUSE_KEYS = ["gryffindor", "hufflepuff", "ravenclaw", "slytherin"];

/** Допуск вокруг 60% и 40% (из‑за дискретных баллов за 5 вопросов точные проценты редки). */
const LEADER_MIN = 0.55;
const LEADER_MAX = 0.65;
const RUNNER_MIN = 0.35;
const RUNNER_MAX = 0.45;

/**
 * Суммирует баллы по выбранным ответам.
 * @param {Array<{ scores: object }>} answers
 */
export function calculateHouseTotals(answers) {
  const total = { gryffindor: 0, hufflepuff: 0, ravenclaw: 0, slytherin: 0 };
  answers.forEach((option) => {
    Object.entries(option.scores).forEach(([house, value]) => {
      if (total[house] !== undefined) {
        total[house] += value;
      }
    });
  });
  return total;
}

/**
 * @param {object} totals — баллы по факультетам
 * @returns {{ type: 'clear', winner: string } | { type: 'choice', options: [string, string], percents: object }}
 */
export function resolveQuizOutcome(totals) {
  const sorted = HOUSE_KEYS.map((key) => [key, totals[key] || 0]).sort((a, b) => b[1] - a[1]);

  const sum = sorted.reduce((acc, [, score]) => acc + score, 0);
  if (sum === 0) {
    return { type: "clear", winner: sorted[0][0] };
  }

  const [leader, runner] = sorted;
  const leaderShare = leader[1] / sum;
  const runnerShare = runner[1] / sum;

  const needsChoice =
    leaderShare >= LEADER_MIN &&
    leaderShare <= LEADER_MAX &&
    runnerShare >= RUNNER_MIN &&
    runnerShare <= RUNNER_MAX;

  if (needsChoice) {
    return {
      type: "choice",
      options: [leader[0], runner[0]],
      percents: {
        [leader[0]]: Math.round(leaderShare * 100),
        [runner[0]]: Math.round(runnerShare * 100),
      },
    };
  }

  return { type: "clear", winner: leader[0] };
}
