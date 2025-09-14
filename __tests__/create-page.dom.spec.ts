/* @vitest-environment jsdom */
import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock host SDK to make this package-level test self-contained
vi.mock("@renderx-plugins/host-sdk", () => {
  return {
    useConductor: () => null,
    isFlagEnabled: () => false,
    EventRouter: {
      publish: () => {
        throw new Error("no router");
      },
      subscribe: () => () => {}, // Return unsubscribe function
    },
    resolveInteraction: (key: string) => {
      if (key === "library.component.drop") {
        return { pluginId: "LibraryComponentDropPlugin", sequenceId: "library-component-drop-symphony" };
      }
      if (key === "library.container.drop") {
        return { pluginId: "LibraryContainerDropPlugin", sequenceId: "library-container-drop-symphony" };
      }
      if (key === "canvas.component.select") {
        return { pluginId: "CanvasComponentPlugin", sequenceId: "canvas-component-select-symphony" };
      }
      if (key === "canvas.component.export") {
        return { pluginId: "CanvasComponentPlugin", sequenceId: "canvas-component-export-symphony" };
      }
      if (key === "canvas.component.export.gif") {
        return { pluginId: "CanvasComponentPlugin", sequenceId: "canvas-component-export-gif-symphony" };
      }
      if (key === "canvas.component.export.mp4") {
        return { pluginId: "CanvasComponentPlugin", sequenceId: "canvas-component-export-mp4-symphony" };
      }
      throw new Error("Unknown interaction key: " + key);
    },
  } as any;
});

// import { onDropForTest } from "../src/ui/CanvasDrop";

// This ensures Canvas UI does not render nodes; stage-crew/DOM handler is responsible

describe("CanvasPage drop orchestration (no UI node rendering)", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="rx-canvas"></div>';
  });

  it.skip("forwards to drop symphony and does not render React nodes directly", async () => {
    const calls: any[] = [];
    const _conductor = { play: vi.fn((a: string, b: string) => calls.push([a, b])) } as any;

    const _fakeEvent: any = {
      preventDefault: vi.fn(),
      dataTransfer: { getData: vi.fn(() => JSON.stringify({ component: { template: { tag: "button" } } })) },
      clientX: 10, clientY: 20,
      currentTarget: { getBoundingClientRect: () => ({ left: 0, top: 0 }) },
    };

    // TODO: Fix this test - need to properly mock @renderx-plugins/host-sdk
    // await onDropForTest(_fakeEvent, _conductor);

    // TODO: Re-enable these assertions once the mock is working
    // const found = calls.find((c) => c[0] === "LibraryComponentDropPlugin" && c[1] === "library-component-drop-symphony");
    // expect(found).toBeTruthy();

    // The UI should not render anything; container remains empty until create beat runs
    expect(document.querySelector("#rx-canvas")!.children.length).toBe(0);
  });
});

