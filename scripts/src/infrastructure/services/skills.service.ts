import { env } from '@config/env';

/* Contracts */
import { ApiAdapterContract } from '@domain/contracts/adapters';
import { SkillsServiceContract } from '@domain/contracts/services';

/* Entities */
import { SkillEntity } from '@domain/entities';

/* Interfaces */
import { SkillsResponse } from '../interfaces';

export class SkillsService implements SkillsServiceContract {
    constructor(
        private readonly apiAdapter: ApiAdapterContract
    ) {}

    /**
     * Get all skills from the API
     *
     * @returns {Promise<SkillEntity[]>} A Promise that resolves with an array of SkillEntity
     */
    public async getAll(): Promise<SkillEntity[]> {
        try {
            const url = `${ env.PORTFOLIO_API_URL }/skills`;
            const { skills } = await this.apiAdapter.get<SkillsResponse>(url);

            return skills.map(SkillEntity.fromEndpoint);
        }
        catch (error) {
            throw error;
        }
    }
}