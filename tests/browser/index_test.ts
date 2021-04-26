import { HeadlessBrowser, Rhum } from "../deps.ts";

Rhum.testPlan("Home page", () => {
  Rhum.testSuite("Item Type Switch", () => {
    Rhum.testCase(
      "Weapon and double types are selected by default. Armour and single are not",
      async () => {
        const Sinco = new HeadlessBrowser();
        await Sinco.build();
        await Sinco.goTo("http://localhost:1337");
        const result = await Sinco.evaluatePage(() => {
          return {
            // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
            // @ts-ignore
            weapon: document.getElementById("weapon").checked,
            // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
            // @ts-ignore
            armour: document.getElementById("armour").checked,
            // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
            // @ts-ignore
            single: document.getElementById("single").checked,
            // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
            // @ts-ignore
            double: document.getElementById("double").checked,
          };
        });
        await Sinco.done();
        Rhum.asserts.assertEquals(result, {
          weapon: true,
          armour: false,
          single: false,
          double: true,
        });
      },
    );
    Rhum.testCase("Siwtching to single updates UI", async () => {
      const Sinco = new HeadlessBrowser();
      await Sinco.build();
      await Sinco.goTo("http://localhost:1337");
      await Sinco.click("#single");
      const result = await Sinco.evaluatePage(() => {
        return {
          // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
          // @ts-ignore
          single: document.getElementById("single-container").style.display,
          // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
          // @ts-ignore
          double: document.getElementById("compare-container").style.display,
        };
      });
      await Sinco.done();
      Rhum.asserts.assertEquals(result, {
        single: "block",
        double: "none",
      });
    });
    // Rhum.testCase("Can switch types back and forth for double", async () => {
    //   const Sinco = new HeadlessBrowser();
    //   await Sinco.build();
    //   await Sinco.goTo("http://localhost:1337");
    //   await Sinco.click("input#armour");
    //   async function getSwitchCheckedProps(): Promise<[boolean, boolean]> {
    //     return await Sinco.evaluatePage(() => {
    //       // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
    //       // @ts-ignore
    //       const elem = document.querySelector("input#armour");
    //       // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
    //       // @ts-ignore
    //       const elem2 = document.querySelector("input#weapon");
    //       // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
    //       // @ts-ignore
    //       return [elem2.checked, elem.checked];
    //     }) as [boolean, boolean];
    //   }
    //   const firstSwitchChecked = await getSwitchCheckedProps();
    //   await Sinco.click("input#weapon");
    //   const secondSwitchChecked = await getSwitchCheckedProps();
    //   await Sinco.done();
    //   Rhum.asserts.assertEquals(firstSwitchChecked, [false, true]);
    //   Rhum.asserts.assertEquals(secondSwitchChecked, [true, false]);
    // });
  });
  Rhum.testSuite("Single item check", () => {
    Rhum.testCase("Will update progress bar", async () => {
      const Sinco = new HeadlessBrowser();
      await Sinco.build();
      await Sinco.goTo("http://localhost:1337");
      await Sinco.click("#single");
      const result = await Sinco.evaluatePage(() => {
        // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
        // @ts-ignore
        document.getElementById("single-level").value = 13;
        // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
        // @ts-ignore
        document.getElementById("single-power").value = 600;
        // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
        // @ts-ignore
        document.getElementById("single-rarity").value = "Legendary";
        // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
        // @ts-ignore
        document.getElementById("single-level").dispatchEvent(
          // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
          // @ts-ignore
          new KeyboardEvent("keyup", { "key": "4" }),
        );
        // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
        // @ts-ignore
        return {
          // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
          // @ts-ignore
          width: document.querySelector("div#single-result > div").style.width,
          // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
          // @ts-ignore
          background:
            document.querySelector("div#single-result").getElementsByClassName
              // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
              // @ts-ignore
              .background,
        };
      });
      await Sinco.done();
      Rhum.asserts.assertEquals(result, {
        width: "86%",
        background: "purple",
      });
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
        Rhum.asserts.assertEquals(result, "16929");
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
        Rhum.asserts.assertEquals(result, "16929");
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
      await Sinco.done();
    });
  });
});

Rhum.run();
