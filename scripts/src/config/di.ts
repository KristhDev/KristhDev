/* Contracts */
import { ApiAdapterContract, FileSystemAdapterContract, LoggerAdapterContract } from '@domain/contracts/adapters';
import { MarkdownServiceContract, ProjectsServiceContract, ReadmeServiceContract, SkillsServiceContract } from '@domain/contracts/services';
import { ReadmeFacadeContract } from '@domain/contracts/facades';
import { UpdateBannerSectionOfReadmeUseCaseContract, UpdateLastProjectsSectionOfReadmeUseCaseContract, UpdateSkillsSectionOfReadmeUseCaseContract } from '@domain/contracts/usecases';

/* Adapters */
import { ApiAdapter, FileSystemAdapter, LoggerAdapter } from '@infrastructure/adapters';

/* Services */
import { MarkdownService, ProjectsService, ReadmeService, SkillsService } from '@infrastructure/services';

/* Facades */
import { ReadmeFacade } from '@application/facades';

/* UseCases */
import { UpdateBannerSectionOfReadmeUseCase, UpdateLastProjectsSectionOfReadmeUseCase, UpdateSkillsSectionOfReadmeUseCase } from '@application/usecases';

export const apiAdapter: ApiAdapterContract = new ApiAdapter();
export const fileSystemAdapter: FileSystemAdapterContract = new FileSystemAdapter();
export const loggerAdapter: LoggerAdapterContract = new LoggerAdapter({ renderLogsInConsole: true, writeLogsInFile: true }); 

export const markdownService: MarkdownServiceContract = new MarkdownService(fileSystemAdapter);
export const projectsService: ProjectsServiceContract = new ProjectsService(apiAdapter);
export const readmeService: ReadmeServiceContract= new ReadmeService(markdownService);
export const skillsService: SkillsServiceContract = new SkillsService(apiAdapter);

export const readmeFacade: ReadmeFacadeContract = new ReadmeFacade(projectsService, skillsService, readmeService);

export const updateBannerSectionOfReadmeUseCase: UpdateBannerSectionOfReadmeUseCaseContract = new UpdateBannerSectionOfReadmeUseCase(readmeFacade);
export const updateLastProjectsSectionOfReadmeUseCase: UpdateLastProjectsSectionOfReadmeUseCaseContract = new UpdateLastProjectsSectionOfReadmeUseCase(readmeFacade);
export const updateSkillsSectionOfReadmeUseCase: UpdateSkillsSectionOfReadmeUseCaseContract = new UpdateSkillsSectionOfReadmeUseCase(readmeFacade);