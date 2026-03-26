import { useEffect, useState } from "react";
import Papa from "papaparse";

type GameRow = {
  Name?: string;
  Platform?: string;
  [key: string]: string | undefined;
};

const PAGE_SIZE = 20;

function createThumbnail(row: GameRow) {
  const title = row.Name ?? "Unnamed game";
  const platform = row.Platform ?? "Game";
  const initials =
    title
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase() ?? "")
      .join("") || "GM";

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180">
      <defs>
        <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1f3c88" />
          <stop offset="100%" stop-color="#39a0ed" />
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#cardGradient)" />
      <circle cx="270" cy="40" r="52" fill="rgba(255,255,255,0.12)" />
      <circle cx="60" cy="150" r="68" fill="rgba(255,255,255,0.08)" />
      <text x="28" y="108" fill="#ffffff" font-family="Segoe UI, Arial, sans-serif" font-size="54" font-weight="700">${initials}</text>
      <text x="28" y="145" fill="#d9eeff" font-family="Segoe UI, Arial, sans-serif" font-size="22">${platform}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function MainPanel() {
  const [data, setData] = useState<GameRow[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("/Video_Games.csv")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setData(results.data as GameRow[]);
            setCurrentPage(1);
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching the CSV:", error);
      });
  }, []);

  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedData = data.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className="container-fluid text-light">
      <p className="display-6">Games</p>
      <div className="row g-3">
        {paginatedData.map((row, index) => (
          <div
            key={`${row.Name ?? "game"}-${startIndex + index}`}
            className="col-12 col-sm-6 col-lg-4"
          >
            <article className="card h-100 shadow-sm border-0">
              <img
                src={createThumbnail(row)}
                className="card-img-top"
                alt={`${row.Name ?? "Unnamed game"} thumbnail`}
              />
              <div className="card-body">
                <h2 className="card-title fs-5 text-dark mb-0">
                  {row.Name ?? "Unnamed game"}
                </h2>
              </div>
            </article>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="d-flex justify-content-center gap-3 mt-4 mb-3">
          <button
            className="btn btn-outline-light btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-outline-light btn-sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((page) => page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default MainPanel;
