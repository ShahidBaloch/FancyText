"use client";

import Link from "next/link";
import type { KaomojiSituationRow } from "@/data/kaomoji";
import { useCopyFeedback } from "@/lib/copy";

type KaomojiSituationTableProps = {
  rows: KaomojiSituationRow[];
};

export function KaomojiSituationTable({ rows }: KaomojiSituationTableProps) {
  const { copiedId, errorId, errorMessage, copy } = useCopyFeedback();

  return (
    <div>
      {errorMessage ? (
        <p className="copy-status" role="alert">
          {errorMessage}
        </p>
      ) : null}
      <div className="codes-table-wrap">
        <table className="codes-table kaomoji-meaning-table">
          <thead>
            <tr>
              <th>Situation</th>
              <th>Try this face</th>
              <th>Full list</th>
              <th>Copy</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const id = `situation-${row.situation}`;
              return (
                <tr key={row.situation}>
                  <td>
                    {row.situation}
                    <br />
                    <small>{row.hint}</small>
                  </td>
                  <td className="kaomoji-meaning-face">{row.face}</td>
                  <td>
                    <Link href={row.href}>{row.linkLabel}</Link>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="kaomoji-meaning-copy"
                      onClick={() => copy(id, row.face, row.situation)}
                    >
                      {copiedId === id
                        ? "Copied!"
                        : errorId === id
                          ? "Failed"
                          : "Copy"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
