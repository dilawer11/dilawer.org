"use client";

import { type ReactElement, useState } from "react";
import { PublicationList } from "@/components/publication-list";
import type { ContentEntry } from "@/lib/content";

type PublicationExplorerProps = {
  entries: ContentEntry[];
};

const allTopics = "All topics";

export function PublicationExplorer({ entries }: PublicationExplorerProps): ReactElement {
  const topics = [
    ...new Set(
      entries
        .map((entry) => entry.topic)
        .filter((topic): topic is string => topic !== undefined),
    ),
  ].sort();
  const years = [
    ...new Set(
      entries
        .map((entry) => entry.year)
        .filter((year): year is number => year !== undefined),
    ),
  ].sort((left, right) => right - left);
  const [selectedTopic, setSelectedTopic] = useState(allTopics);
  const [selectedYear, setSelectedYear] = useState("all");

  const filteredEntries = entries.filter((entry) => {
    const matchesTopic = selectedTopic === allTopics || entry.topic === selectedTopic;
    const matchesYear = selectedYear === "all" || entry.year?.toString() === selectedYear;
    return matchesTopic && matchesYear;
  });

  return (
    <div className="publication-explorer">
      <div className="publication-filters">
        <div className="publication-topic-filter" role="group" aria-label="Filter by topic">
          {[allTopics, ...topics].map((topic) => (
            <button
              type="button"
              className="filter-chip"
              aria-pressed={selectedTopic === topic}
              key={topic}
              onClick={() => setSelectedTopic(topic)}
            >
              {topic}
            </button>
          ))}
        </div>
        <label className="publication-year-filter">
          <span>Year</span>
          <select value={selectedYear} onChange={(event) => setSelectedYear(event.target.value)}>
            <option value="all">All years</option>
            {years.map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="publication-result-count" aria-live="polite">
        {filteredEntries.length} {filteredEntries.length === 1 ? "publication" : "publications"}
      </p>
      {filteredEntries.length > 0 ? (
        <PublicationList entries={filteredEntries} />
      ) : (
        <p className="publication-empty">No publications match both filters.</p>
      )}
    </div>
  );
}
