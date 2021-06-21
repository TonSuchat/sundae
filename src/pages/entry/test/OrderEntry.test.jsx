import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import OrderEntry from "../OrderEntry";

describe("OrderEntry", () => {
  test("handles error for scoops and toppings routes", async () => {
    server.resetHandlers(
      rest.get("http://localhost:3030/scoops", (_req, res, ctx) =>
        res(ctx.status(500))
      ),
      rest.get("http://localhost:3030/toppings", (_req, res, ctx) =>
        res(ctx.status(500))
      )
    );

    render(<OrderEntry setOrderPhase={jest.fn()} />);

    await waitFor(async () => {
      const alerts = await screen.findAllByRole("alert");
      expect(alerts).toHaveLength(2);
    });
  });

  test("order button disabled/enabled properly based on scoops selection", async () => {
    render(<OrderEntry setOrderPhase={jest.fn()} />);

    const orderButton = screen.getByRole("button", { name: /order sundae!/i });
    expect(orderButton).toBeDisabled();

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i,
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    expect(orderButton).toBeEnabled();

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "0");
    expect(orderButton).toBeDisabled();
  });
});
