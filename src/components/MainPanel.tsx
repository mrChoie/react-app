import { useEffect, useState } from "react";
import type { GameRow, RankingOption } from "../types/games";

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
          <stop offset="0%" stop-color="#1f1f1f" />
          <stop offset="100%" stop-color="#646464" />
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#cardGradient)" />
      <text x="28" y="108" fill="#ffffff" font-family="Segoe UI, Arial, sans-serif" font-size="54" font-weight="700">${initials}</text>
      <text x="28" y="145" fill="#838383" font-family="Segoe UI, Arial, sans-serif" font-size="22">${platform}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

type MainPanelProps = {
  data: GameRow[];
  ranking: RankingOption;
  searchValue: string;
  onSearchChange: (value: string) => void;
};

function MainPanel({
  data,
  ranking,
  searchValue,
  onSearchChange,
}: MainPanelProps) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [data, ranking]);

  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedData = data.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <section className="container-fluid text-light">
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-3">
        <div>
          <p className="display-6 mb-0">Games</p>
        </div>
        <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-2">
          <input
            type="search"
            className="form-control"
            placeholder="Search game name"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            aria-label="Search game names"
          />
          <span className="badge text-bg-secondary fs-6">{data.length} results</span>
        </div>
      </div>
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
                <h2 className="card-title fs-5 text-dark mb-2">
                  {row.Name ?? "Unnamed game"}
                </h2>
                <p className="card-text text-muted mb-1">
                  {row.Platform ?? "Unknown platform"}
                </p>
                <p className="card-text text-muted mb-1">
                  {row.Publisher ?? "Unknown publisher"}
                </p>
                <p className="card-text text-muted mb-0">
                  {row.Year_of_Release ?? "Unknown year"}
                </p>
              </div>
            </article>
          </div>
        ))}
      </div>
      {data.length === 0 && (
          <div className="card bg-dark border-secondary mt-3">
          <div className="card-body">
            No games match the current filters or search.
          </div>
        </div>
      )}
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
    </section>
  );
}

export default MainPanel;
