import { useState } from "react";
import "./App.css";

const files = [
  {
    name: "index.html",
  },
  {
    name: "package.json",
  },
  {
    name: "node_modules",
    children: [
      {
        name: "react",
      },
      {
        name: "node_modules",
        children: [
          {
            name: "joi",
          },
        ],
      },
    ],
  },
  {
    name: "tsconfig.json",
  },
];

type TEntry = {
  name: string;
  children?: TEntry[];
};

function Entry({ entry, depth }: { entry: TEntry; depth: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{ paddingLeft: `${depth * 10}px` }}>
      {entry.children ? (
        <button className="entry" onClick={() => setIsExpanded(!isExpanded)}>
          {(isExpanded ? "- " : "+ ") + entry.name}
        </button>
      ) : (
        entry.name
      )}

      {isExpanded &&
        entry.children?.map((entryParam) => (
          <Entry entry={entryParam} depth={depth + 1} />
        ))}
    </div>
  );
}

function App() {
  return (
    <div>
      {files.map((entryParam) => {
        return <Entry entry={entryParam} depth={0} />;
      })}
    </div>
  );
}

export default App;
