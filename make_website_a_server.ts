import { Drash, Tengine } from "./tests/deps.ts"

class HomeResource extends Drash.Http.Resource {
  static paths = ["/"]
  public GET () {
    this.response.body = this.response.render("/index.html")
    return this.response
  }
}

class A extends Drash.Http.Resource {
  static paths = ["/index.css", "/index.js"]
  public GET () {
    const path = this.request.url_path
    const raw = Deno.readFileSync("." + path)
    const decoded = new TextDecoder().decode(raw)
    this.response.body = decoded
    const contentType = path.includes("css") ? "text/css" : "application/javascript"
    this.response.headers.set("Content-Type", contentType)
    return this.response
  }
}

const tengine = Tengine({
  render: (...args: unknown[]): boolean => {
    return false;
  },
  views_path: ".",
});

const server = new Drash.Http.Server({
  directory: ".",
  resources: [HomeResource, A],
  middleware: {
    after_resource: [tengine]
  },
  static_paths: ["/public"]
})

await server.run({
  hostname: "localhost",
  port: 1337
})

console.log('server running')