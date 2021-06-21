import { render, screen } from "../../../test-utils/testing-library-utils";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import OrderConfirmation from "../OrderConfirmation";

describe("OrderConfirmation", () => {
  test("hanldes error", async () => {
    server.resetHandlers(
      rest.post("http://localhost:3030/order", (_req, res, ctx) => {
        res(ctx.status(500));
      })
    );

    render(<OrderConfirmation setOrderPhase={jest.fn()} />);
    const alert = await screen.findByRole("alert");
    expect(alert).toBeInTheDocument();
  });
});
