import { markers, markersMessages } from '../application/constants/markers.constant';

import { MarkdownError } from '../domain/errors/mardown.error';

import { ReadmeService } from '../infrastructure/services/readme.service';

const updateBannerSection = async () => {
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