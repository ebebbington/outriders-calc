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
    Rhum.testCase(
      "Switching to and from armour updates the level 50 power of each item when fields are set",
      async () => {
        const Sinco = new HeadlessBrowser();
        await Sinco.build();
        await Sinco.goTo("http://localhost:1337");
        const result1 = await Sinco.evaluatePage(() => {
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
            document.getElementById("item-1-result").value,
            // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
            // @ts-ignore
            document.getElementById("item-2-result").value,
          ];
        });
        await Sinco.click("#armour");
        const result2 = await Sinco.evaluatePage(() => {
          return [
            // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
            // @ts-ignore
            document.getElementById("item-1-result").className,
            // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
            // @ts-ignore
            document.getElementById("item-2-result").className,
          ];
        });
        await Sinco.click("#weapon");
        const result3 = await Sinco.evaluatePage(() => {
          return [
            // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
            // @ts-ignore
            document.getElementById("item-1-result").value,
            // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
            // @ts-ignore
            document.getElementById("item-2-result").value,
          ];
        });
        await Sinco.done();
        Rhum.asserts.assertEquals(result1, ["932", "16929"]);
        Rhum.asserts.assertEquals(result2, ["556", "10375"]);
        Rhum.asserts.assertEquals(result3, ["932", "16929"]);
      },
    );
    Rhum.testCase("Switching to single updates UI", async () => {
      const Sinco = new HeadlessBrowser();
      await Sinco.build();
      await Sinco.goTo("http://localhost:1337");
      const result = await Sinco.evaluatePage(() => {
        // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
        // @ts-ignore
        document.getElementById("single").click();
        return {
          // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
          // @ts-ignore
          single: document.getElementById("single-container").className
            .includes("display-none"),
          // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
          // @ts-ignore
          double: document.getElementById("compare-container").className
            .includes("display-none"),
        };
      });
      await Sinco.done();
      Rhum.asserts.assertEquals(result, {
        single: false,
        double: true,
      });
    });
    Rhum.testCase("Can switch types back and forth for double", async () => {
      const Sinco = new HeadlessBrowser();
      await Sinco.build();
      await Sinco.goTo("http://localhost:1337");
      await Sinco.click("input#armour");
      async function getSwitchCheckedProps(): Promise<[boolean, boolean]> {
        return await Sinco.evaluatePage(() => {
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
      }
      const firstSwitchChecked = await getSwitchCheckedProps();
      await Sinco.click("input#weapon");
      const secondSwitchChecked = await getSwitchCheckedProps();
      await Sinco.done();
      Rhum.asserts.assertEquals(firstSwitchChecked, [false, true]);
      Rhum.asserts.assertEquals(secondSwitchChecked, [true, false]);
    });
    Rhum.testCase(
      "Specific radios are disabled in certain scenarios",
      async () => {
        const Sinco = new HeadlessBrowser();
        await Sinco.build();
        await Sinco.goTo("http://localhost:1337");
        async function getRadioInfo() {
          return await Sinco.evaluatePage(() => {
            return {
              weapon: {
                // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
                // @ts-ignore
                checked: document.getElementById("weapon").checked,
                // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
                // @ts-ignore
                disabled: document.getElementById("weapon").getAttribute(
                  "disabled",
                ),
              },
              armour: {
                // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
                // @ts-ignore
                checked: document.getElementById("armour").checked,
                // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
                // @ts-ignore
                disabled: document.getElementById("armour").getAttribute(
                  "disabled",
                ),
              },
              single: {
                // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
                // @ts-ignore
                checked: document.getElementById("single").checked,
                // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
                // @ts-ignore
                disabled: document.getElementById("single").getAttribute(
                  "disabled",
                ),
              },
              double: {
                // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
                // @ts-ignore
                checked: document.getElementById("double").checked,
                // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
                // @ts-ignore
                disabled: document.getElementById("double").getAttribute(
                  "disabled",
                ),
              },
            };
          });
        }
        const result1 = await getRadioInfo();
        await Sinco.click("#armour");
        const result2 = await getRadioInfo();
        await Sinco.click("#weapon");
        const result3 = await getRadioInfo();
        await Sinco.click("#single");
        const result4 = await getRadioInfo();
        await Sinco.done();
        Rhum.asserts.assertEquals(result1, {
          weapon: {
            checked: true,
            disabled: null,
          },
          armour: {
            checked: false,
            disabled: null,
          },
          single: {
            checked: false,
            disabled: null,
          },
          double: {
            checked: true,
            disabled: null,
          },
        });
        Rhum.asserts.assertEquals(result2, {
          weapon: {
            checked: false,
            disabled: null,
          },
          armour: {
            checked: true,
            disabled: null,
          },
          single: {
            checked: false,
            disabled: "true",
          },
          double: {
            checked: true,
            disabled: null,
          },
        });
        Rhum.asserts.assertEquals(result3, {
          weapon: {
            checked: true,
            disabled: null,
          },
          armour: {
            checked: false,
            disabled: null,
          },
          single: {
            checked: false,
            disabled: null,
          },
          double: {
            checked: true,
            disabled: null,
          },
        });
        Rhum.asserts.assertEquals(result4, {
          weapon: {
            checked: true,
            disabled: null,
          },
          armour: {
            checked: false,
            disabled: "true",
          },
          single: {
            checked: true,
            disabled: null,
          },
          double: {
            checked: false,
            disabled: null,
          },
        });
      },
    );
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
          background:
            // deno-lint-ignore ban-ts-comment Deno broke usage of the tsconfig we need again...
            // @ts-ignore
            document.querySelector("div#single-result > div").style
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
