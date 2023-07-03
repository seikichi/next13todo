// MEMO: consider to use neverthrow

export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

export function ok<T>(value: T) {
  return { ok: true, value } as const;
}

export function err<E>(error: E) {
  return { ok: false, error } as const;
}
