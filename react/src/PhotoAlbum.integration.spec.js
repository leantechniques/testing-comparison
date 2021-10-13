import { screen, render } from "@testing-library/react";
import { PhotoAlbum } from "./PhotoAlbum";
import userEvent from "@testing-library/user-event";
import { get } from "./common/fetchService";
import { createPhotoResponse } from "./common/objectBuilders";

jest.mock("./common/fetchService");

describe("PhotoAlbum", () => {
    it("should return no photos when component loads", () => {
        get.mockResolvedValue([createPhotoResponse(1)]);
        render(<PhotoAlbum />);

        const albumText = screen.queryByText("Album ID: 1");
        expect(albumText).not.toBeInTheDocument();
        const albumImage = screen.queryByAltText("Album ID 1");
        expect(albumImage).not.toBeInTheDocument();
    });

    it("should return photos when typing into search input and search button is clicked", async () => {
        get.mockResolvedValue([createPhotoResponse(1)]);
        render(<PhotoAlbum />);

        const searchInput = screen.getByLabelText("Search:");
        const searchButton = screen.getByRole("button", {
            name: "Search",
        });
        userEvent.type(searchInput, "1");
        userEvent.click(searchButton);

        const albumText = await screen.findByText("Album ID: 1");
        expect(albumText).toBeInTheDocument();
        const albumImage = await screen.findByAltText("Album ID 1");
        expect(albumImage).toBeInTheDocument();
    });
});
