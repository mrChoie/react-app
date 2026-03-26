import { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import SidePanel from "../components/SidePanel";
import MainPanel from "../components/MainPanel";
import type { GameFilters, GameRow } from "../types/games";

const defaultFilters: GameFilters = {
  genre: "",
  platform: "",
  year: "",
  publisher: "",
  ranking: "none",
  search: "",
};

function getUniqueValues(data: GameRow[], key: keyof GameRow) {
  return [...new Set(data.map((row) => row[key]).filter(Boolean) as string[])];
}

function toNumber(value?: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function GamesPage() {
  const [games, setGames] = useState<GameRow[]>([]);
  const [filters, setFilters] = useState<GameFilters>(defaultFilters);

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
            setGames(results.data as GameRow[]);
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching the CSV:", error);
      });
  }, []);

  const genreOptions = useMemo(
    () => getUniqueValues(games, "Genre").sort((a, b) => a.localeCompare(b)),
    [games],
  );
  const platformOptions = useMemo(
    () => getUniqueValues(games, "Platform").sort((a, b) => a.localeCompare(b)),
    [games],
  );
  const yearOptions = useMemo(
    () =>
      getUniqueValues(games, "Year_of_Release").sort(
        (a, b) => Number(b) - Number(a),
      ),
    [games],
  );
  const publisherOptions = useMemo(
    () =>
      getUniqueValues(games, "Publisher").sort((a, b) => a.localeCompare(b)),
    [games],
  );

  const filteredGames = useMemo(() => {
    const filtered = games.filter((game) => {
      if (filters.genre && game.Genre !== filters.genre) {
        return false;
      }

      if (filters.platform && game.Platform !== filters.platform) {
        return false;
      }

      if (filters.year && game.Year_of_Release !== filters.year) {
        return false;
      }

      if (filters.publisher && game.Publisher !== filters.publisher) {
        return false;
      }

      if (
        filters.search &&
        !game.Name?.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    if (filters.ranking === "userCount") {
      return [...filtered].sort(
        (a, b) => toNumber(b.User_Count) - toNumber(a.User_Count),
      );
    }

    if (filters.ranking === "globalSales") {
      return [...filtered].sort(
        (a, b) => toNumber(b.Global_Sales) - toNumber(a.Global_Sales),
      );
    }

    if (filters.ranking === "yearRelease") {
      return [...filtered].sort(
        (a, b) => toNumber(b.Year_of_Release) - toNumber(a.Year_of_Release),
      );
    }

    return filtered;
  }, [games, filters]);

  function handleFilterChange<K extends keyof GameFilters>(
    key: K,
    value: GameFilters[K],
  ) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value,
    }));
  }

  return (
    <div className="container mt-4 mb-4">
      <div className="row g-4">
        <div className="col-12 col-lg-3">
          <SidePanel
            filters={filters}
            genreOptions={genreOptions}
            platformOptions={platformOptions}
            yearOptions={yearOptions}
            publisherOptions={publisherOptions}
            onFilterChange={handleFilterChange}
            onResetFilters={() => setFilters(defaultFilters)}
          />
        </div>
        <div className="col-12 col-lg-9">
          <MainPanel
            data={filteredGames}
            ranking={filters.ranking}
            searchValue={filters.search}
            onSearchChange={(value) => handleFilterChange("search", value)}
          />
        </div>
      </div>
    </div>
  );
}

export default GamesPage;
