/* Constants */
import { markers, markersMessages } from '../application/constants/markers.constant';

/* Errors */
import { MarkdownError } from '../domain/errors/mardown.error';

/* Services */
import { ReadmeService } from '../infrastructure/services/readme.service';

/**
 * Updates the banner section in the README.md file.
 *
 * The banner section is the first section in the README.md file and contains
 * a heading with the name of the user and a link to the user's portfolio.
 *
 * @returns {Promise<void>} A Promise that resolves when the banner section has been updated.
 */
const updateBannerSection = async (): Promise<void> => {
    try {
        const bannerSection = ReadmeService.generateBannerSection();
        const readmeContent = ReadmeService.loadReadme();

        const startIndex = readmeContent.indexOf(markers.BANNER_SECTION_START);
        const endIndex = readmeContent.indexOf(markers.BANNER_SECTION_END);

        const hasStartMarker = startIndex !== -1;
        const hasEndMarker = endIndex !== -1;

        const hasMarkers = hasStartMarker && hasEndMarker;

        const areMarkersWellPositioned = hasMarkers && ((startIndex + markers.BANNER_SECTION_START.length) < endIndex);
        if (!hasMarkers || !areMarkersWellPositioned) throw new MarkdownError(markersMessages.BANNER_MAKERS_FAILED);

        const updatedReadmeContent = ReadmeService.updateSection({
            content: readmeContent,
            markers: { start: startIndex + markers.BANNER_SECTION_START.length, end: endIndex },
            newContent: bannerSection
        });

        ReadmeService.updateReadme(updatedReadmeContent);
    }
    catch (error) {
        console.error(error);
    }
}

updateBannerSection();