"use client";

import type { KaomojiMeaning } from "@/data/kaomoji";
import { useCopyFeedback } from "@/lib/copy";

type KaomojiMeaningTableProps = {
  rows: KaomojiMeaning[];
};

export function KaomojiMeaningTable({ rows }: KaomojiMeaningTableProps) {
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
              <th>Face</th>
              <th>Name</th>
              <th>What it means</th>
              <th>Copy</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const id = `meaning-${row.name}`;
              return (
                <tr key={row.name}>
                  <td className="kaomoji-meaning-face">{row.face}</td>
                  <td>{row.name}</td>
                  <td>{row.meaning}</td>
                  <td>
                    <button
                      type="button"
                      className="kaomoji-meaning-copy"
                      onClick={() => copy(id, row.face, row.name)}
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
