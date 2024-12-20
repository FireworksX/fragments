import { describe, expect, it } from "vitest";
import { nodes, variableType } from "@fragments/plugin-fragment";

describe("fds", () => {
  it("fsd", () => {
    const props = [
      { _type: nodes.Variable, _id: "content", type: variableType.String },
      {
        _type: nodes.Variable,
        _id: "teamA",
        type: variableType.Object,
        fields: {
          name: {
            _type: nodes.Variable,
            _id: "teamName",
            type: variableType.String,
          },
        },
      },
    ];

    expect(true).toBe(true);
  });
});
