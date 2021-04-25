import { Rhum, HeadlessBrowser } from "../deps.ts" 

Rhum.testPlan("Home page", () => {
    Rhum.testSuite("Item Type Switch", async () => {
        Rhum.testCase("Weapon type is selected by default", async () => {
        const Sinco = new HeadlessBrowser()
        await Sinco.build()
        await Sinco.goTo("http://localhost:1337")
        const val = await Sinco.getInputValue("input#weapon")
        await Sinco.done()
        console.log(val)
        })

    })
    Rhum.testSuite("Item compare", () => {

    })
    Rhum.testSuite("Footer", () => {

    })
})

Rhum.run()