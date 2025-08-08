/* Contracts */
import { ApiAdapterContract, FileSystemAdapterContract } from '../domain/contracts/adapters';
import { MarkdownServiceContract, ProjectsServiceContract, ReadmeServiceContract } from '../domain/contracts/services';
import { ReadmeFacadeContract } from '../domain/contracts/facades';
import { UpdateBannerSectionOfReadmeUseCaseContract, UpdateLastProjectsSectionOfReadmeUseCaseContract } from '../domain/contracts/usecases';

/* Adapters */
import { ApiAdapter, FileSystemAdapter } from '../infrastructure/adapters';

/* Services */
import { MarkdownService, ProjectsService, ReadmeService } from '../infrastructure/services';

/* Facades */
import { ReadmeFacade } from '../application/facades';

/* UseCases */
import { UpdateBannerSectionOfReadmeUseCase, UpdateLastProjectsSectionOfReadmeUseCase } from '../application/usecases';

export const apiAdapter: ApiAdapterContract = new ApiAdapter();
export const fileSystemAdapter: FileSystemAdapterContract = new FileSystemAdapter();

export const projectsService: ProjectsServiceContract = new ProjectsService(apiAdapter);
export const markdownService: MarkdownServiceContract = new MarkdownService(fileSystemAdapter);
export const readmeService: ReadmeServiceContract= new ReadmeService(markdownService);

export const readmeFacade: ReadmeFacadeContract = new ReadmeFacade(projectsService, readmeService);

export const updateBannerSectionOfReadmeUseCase: UpdateBannerSectionOfReadmeUseCaseContract = new UpdateBannerSectionOfReadmeUseCase(readmeFacade);
export const updateLastProjectsSectionOfReadmeUseCase: UpdateLastProjectsSectionOfReadmeUseCaseContract = new UpdateLastProjectsSectionOfReadmeUseCase(readmeFacade);