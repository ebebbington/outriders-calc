import { HeadlessBrowser, Rhum } from "../deps.ts";

Rhum.testPlan("Home page", () => {
  Rhum.testSuite("Item Type Switch", () => {
    Rhum.testCase("Weapon type is selected by default", async () => {
      const Sinco = new HeadlessBrowser();
      await Sinco.build();
      await Sinco.goTo("http://localhost:1337");
      const val = await Sinco.getInputValue("input#weapon");
      await Sinco.done();
      Rhum.asserts.assertEquals(val, "yes");
    });
    Rhum.testCase("Armor type is not selected by default", async () => {
      const Sinco = new HeadlessBrowser();
      await Sinco.build();
      await Sinco.goTo("http://localhost:1337");
      const val = await Sinco.getInputValue("input#armour");
      await Sinco.done();
      Rhum.asserts.assertEquals(val, "no");
    });
    Rhum.testCase("Can switch type back and forth", async () => {
      const Sinco = new HeadlessBrowser();
      await Sinco.build();
      await Sinco.goTo("http://localhost:1337");
      await Sinco.click("input#armour");
      async function getSwitchCheckedProps(): Promise<[boolean, boolean]> {
        const result = await Sinco.evaluatePage(() => {
          // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
          // @ts-ignore
          const elem = document.querySelector("input#armour");
          // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
          // @ts-ignore
          const elem2 = document.querySelector("input#weapon");
          // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
          // @ts-ignore
          return [elem2.checked, elem.checked];
        }) as [boolean, boolean];
        return result;
      }
      const firstSwitchChecked = await getSwitchCheckedProps();
      await Sinco.click("input#weapon");
      const secondSwitchChecked = await getSwitchCheckedProps();
      await Sinco.done();
      Rhum.asserts.assertEquals(firstSwitchChecked, [false, true]);
      Rhum.asserts.assertEquals(secondSwitchChecked, [true, false]);
    });
  });
  Rhum.testSuite("Item compare", () => {
    Rhum.testCase(
      "Filling in level and power for item 1 shows result",
      async () => {
        const Sinco = new HeadlessBrowser();
        await Sinco.build();
        await Sinco.goTo("http://localhost:1337");
        const result = await Sinco.evaluatePage(() => {
          // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
          // @ts-ignore
          document.getElementById("item-1-level").value = 40;
          // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
          // @ts-ignore
          document.getElementById("item-1-power").value = 4000;
          // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
          // @ts-ignore
          document.getElementById("item-1-level").dispatchEvent(
            // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
            // @ts-ignore
            new KeyboardEvent("keyup", { "key": "4" }),
          );
          // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
          // @ts-ignore
          return document.getElementById("item-1-result").value;
        });
        await Sinco.done();
        Rhum.asserts.assertEquals(result, "5338");
      },
    );
    Rhum.testCase(
      "Filling in level and power for item 2 shows result",
      async () => {
        const Sinco = new HeadlessBrowser();
        await Sinco.build();
        await Sinco.goTo("http://localhost:1337");
        const result = await Sinco.evaluatePage(() => {
          // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
          // @ts-ignore
          document.getElementById("item-2-level").value = 40;
          // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
          // @ts-ignore
          document.getElementById("item-2-power").value = 4000;
          // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
          // @ts-ignore
          document.getElementById("item-2-level").dispatchEvent(
            // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
            // @ts-ignore
            new KeyboardEvent("keyup", { "key": "4" }),
          );
          // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
          // @ts-ignore
          return document.getElementById("item-2-result").value;
        });
        await Sinco.done();
        Rhum.asserts.assertEquals(result, "5338");
      },
    );
    Rhum.testCase(
      "Filling in both items works, and shows which one is strongest",
      async () => {
        const Sinco = new HeadlessBrowser();
        await Sinco.build();
        await Sinco.goTo("http://localhost:1337");
        const result = await Sinco.evaluatePage(() => {
          // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
          // @ts-ignore
          document.getElementById("item-1-level").value = 32;
          // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
          // @ts-ignore
          document.getElementById("item-1-power").value = 100;
          // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
          // @ts-ignore
          document.getElementById("item-1-level").dispatchEvent(
            // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
            // @ts-ignore
            new KeyboardEvent("keyup", { "key": "4" }),
          );
          // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
          // @ts-ignore
          document.getElementById("item-2-level").value = 40;
          // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
          // @ts-ignore
          document.getElementById("item-2-power").value = 4000;
          // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
          // @ts-ignore
          document.getElementById("item-2-level").dispatchEvent(
            // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
            // @ts-ignore
            new KeyboardEvent("keyup", { "key": "4" }),
          );
          return [
            // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
            // @ts-ignore
            document.getElementById("item-1-result").className,
            // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
            // @ts-ignore
            document.getElementById("item-2-result").className,
          ];
        });
        await Sinco.done();
        Rhum.asserts.assertEquals(result, ["highlight-bad", "highlight-good"]);
      },
    );
  });
  Rhum.testSuite("Footer", () => {
    Rhum.testCase("Link in footer directs to GitHub", async () => {
      const Sinco = new HeadlessBrowser();
      await Sinco.build();
      await Sinco.goTo("http://localhost:1337");
      await Sinco.click("a");
      await Sinco.waitForPageChange();
      await Sinco.assertUrlIs(
        "https://github.com/login?return_to=https%3A%2F%2Fgithub.com%2Febebbington%2Foutriders-calc%2Fissues%2Fnew%2Fchoose",
      );
    });
  });
});

Rhum.run();
