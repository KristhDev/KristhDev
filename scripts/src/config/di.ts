/* Env */
import { env } from './env';

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

const isProduction = env.APP_ENV === 'production';

export const loggerAdapter: LoggerAdapterContract = new LoggerAdapter({
    renderLogsInConsole: true,
    writeLogsInFile: !isProduction,
    uploadLogsToService: isProduction,
});

export const apiAdapter: ApiAdapterContract = new ApiAdapter(loggerAdapter);
export const fileSystemAdapter: FileSystemAdapterContract = new FileSystemAdapter(loggerAdapter);

export const markdownService: MarkdownServiceContract = new MarkdownService(fileSystemAdapter);
export const projectsService: ProjectsServiceContract = new ProjectsService(apiAdapter);
export const readmeService: ReadmeServiceContract= new ReadmeService(markdownService);
export const skillsService: SkillsServiceContract = new SkillsService(apiAdapter);

export const readmeFacade: ReadmeFacadeContract = new ReadmeFacade(loggerAdapter, projectsService, skillsService, readmeService);

export const updateBannerSectionOfReadmeUseCase: UpdateBannerSectionOfReadmeUseCaseContract = new UpdateBannerSectionOfReadmeUseCase(readmeFacade);
export const updateLastProjectsSectionOfReadmeUseCase: UpdateLastProjectsSectionOfReadmeUseCaseContract = new UpdateLastProjectsSectionOfReadmeUseCase(readmeFacade);
export const updateSkillsSectionOfReadmeUseCase: UpdateSkillsSectionOfReadmeUseCaseContract = new UpdateSkillsSectionOfReadmeUseCase(readmeFacade);