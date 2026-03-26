import type { GameFilters, RankingOption } from "../types/games";

type SidePanelProps = {
  filters: GameFilters;
  genreOptions: string[];
  platformOptions: string[];
  yearOptions: string[];
  publisherOptions: string[];
  onFilterChange: <K extends keyof GameFilters>(
    key: K,
    value: GameFilters[K],
  ) => void;
  onResetFilters: () => void;
};

const rankingOptions: { label: string; value: RankingOption }[] = [
  { label: "Default order", value: "none" },
  { label: "User Count", value: "userCount" },
  { label: "Global Sales (millions)", value: "globalSales" },
  { label: "Year Released", value: "yearRelease" },
];

function SidePanel({
  filters,
  genreOptions,
  platformOptions,
  yearOptions,
  publisherOptions,
  onFilterChange,
  onResetFilters,
}: SidePanelProps) {
  const filterGroups = [
    {
      id: "genre",
      label: "Genre",
      options: genreOptions,
      value: filters.genre,
    },
    {
      id: "platform",
      label: "Platform",
      options: platformOptions,
      value: filters.platform,
    },
    {
      id: "year",
      label: "Year Release",
      options: yearOptions,
      value: filters.year,
    },
    {
      id: "publisher",
      label: "Publisher",
      options: publisherOptions,
      value: filters.publisher,
    },
  ] as const;

  return (
    <aside className="card border-secondary shadow-sm sticky-top">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="h4 mb-0">Filters</p>
          <button
            type="button"
            className="btn btn-sm text-secondary"
            onClick={onResetFilters}
          >
            Reset
          </button>
        </div>

        {filterGroups.map((group) => (
          <div className="mb-3" key={group.id}>
            <label className="form-label fw-semibold" htmlFor={group.id}>
              {group.label}
            </label>
            <select
              id={group.id}
              className="form-select"
              value={group.value}
              onChange={(event) => onFilterChange(group.id, event.target.value)}
            >
              <option value="">All</option>
              {group.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}

        <div className="mb-0">
          <label className="form-label fw-semibold" htmlFor="ranking">
            Ranking
          </label>
          <select
            id="ranking"
            className="form-select"
            value={filters.ranking}
            onChange={(event) =>
              onFilterChange("ranking", event.target.value as RankingOption)
            }
          >
            {rankingOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </aside>
  );
}

export default SidePanel;
