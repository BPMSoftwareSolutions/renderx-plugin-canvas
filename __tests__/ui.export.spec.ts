import { describe, it, expect, vi } from 'vitest';

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

import * as pkg from '../src/index';

describe('@renderx-plugins/canvas: UI export + register()', () => {
  it('exports CanvasPage and register()', async () => {
    expect(typeof (pkg as any).CanvasPage).toBe('function');
    expect(typeof (pkg as any).register).toBe('function');
  });
});

