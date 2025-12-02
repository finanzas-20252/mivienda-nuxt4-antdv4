export default (nominalRate: number, m: number, n: number): number => {
  if (!isFinite(nominalRate) || !isFinite(m) || !isFinite(n)) {
    throw new Error("Entradas deben ser números finitos.");
  }
  if (m <= 0 || n < 0) throw new Error("m debe ser > 0 y n >= 0.");
  return Math.pow(1 + nominalRate / m, n) - 1;
};
