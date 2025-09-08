/* Contracts */
import { ApiAdapterContract } from '@domain/contracts/adapters';
import { SocialMediaServiceContract } from '@domain/contracts/services';

/* Entities */
import { SocialMediaEntity } from '@domain/entities';

/* Interfaces */
import { SocialMediaEndpoint } from '@infrastructure/interfaces';

export class SocialMediaService implements SocialMediaServiceContract {
    private readonly socialMediaEndpoints: SocialMediaEndpoint[] = [
        {
            id: '499cfb16-31d3-4a63-b726-5cf2291dc356',
            name: 'Facebook',
            badge: 'https://img.shields.io/badge/Facebook-0866FF?style=for-the-badge&logo=facebook&logoColor=white',
            link: 'https://www.facebook.com/kristhian.ferrufino',
            status: 'active',
            created_at: '2025-09-08T16:23:15.000Z',
            updated_at: '2025-09-08T16:23:15.000Z',
        },
        {
            id: '499cfb16-31d3-4a63-b726-5cf2291dc356',
            name: 'Instagram',
            link: 'https://www.instagram.com/kristhdev',
            badge: 'https://img.shields.io/badge/Instagram-FF0069?style=for-the-badge&logo=instagram&logoColor=white',
            status: 'active',
            created_at: '2025-09-08T16:23:15.000Z',
            updated_at: '2025-09-08T16:23:15.000Z',
        },
        {
            id: '499cfb16-31d3-4a63-b726-5cf2291dc356',
            name: 'Threads',
            link: 'https://www.threads.com/@kristhdev',
            badge: 'https://img.shields.io/badge/Threads-000000?style=for-the-badge&logo=threads&logoColor=white',
            status: 'active',
            created_at: '2025-09-08T16:23:15.000Z',
            updated_at: '2025-09-08T16:23:15.000Z',
        },
        {
            id: '499cfb16-31d3-4a63-b726-5cf2291dc356',
            name: 'X (Twitter)',
            link: 'https://twitter.com/kristh_ferr_dev',
            badge: 'https://img.shields.io/badge/X_(Twitter)-000000?style=for-the-badge&logo=x&logoColor=white',
            status: 'active',
            created_at: '2025-09-08T16:23:15.000Z',
            updated_at: '2025-09-08T16:23:15.000Z',
        },
        {
            id: '499cfb16-31d3-4a63-b726-5cf2291dc356',
            name: 'LinkedIn',
            link: 'https://www.linkedin.com/in/kristhian-ferrufino-528bb4235',
            badge: 'https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logoColor=white&logo=data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAgMjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgZmlsbD0iIzAwMDAwMCI+PGcgaWQ9IlNWR1JlcG9fYmdDYXJyaWVyIiBzdHJva2Utd2lkdGg9IjAiPjwvZz48ZyBpZD0iU1ZHUmVwb190cmFjZXJDYXJyaWVyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvZz48ZyBpZD0iU1ZHUmVwb19pY29uQ2FycmllciI+IDx0aXRsZT5saW5rZWRpbiBbI2ZmZmZmZl08L3RpdGxlPiA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4gPGRlZnM+IDwvZGVmcz4gPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+IDxnIGlkPSJEcmliYmJsZS1MaWdodC1QcmV2aWV3IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTgwLjAwMDAwMCwgLTc0NzkuMDAwMDAwKSIgZmlsbD0iI2ZmZmZmZiI+IDxnIGlkPSJpY29ucyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTYuMDAwMDAwLCAxNjAuMDAwMDAwKSI+IDxwYXRoIGQ9Ik0xNDQsNzMzOSBMMTQwLDczMzkgTDE0MCw3MzMyLjAwMSBDMTQwLDczMzAuMDgxIDEzOS4xNTMsNzMyOS4wMSAxMzcuNjM0LDczMjkuMDEgQzEzNS45ODEsNzMyOS4wMSAxMzUsNzMzMC4xMjYgMTM1LDczMzIuMDAxIEwxMzUsNzMzOSBMMTMxLDczMzkgTDEzMSw3MzI2IEwxMzUsNzMyNiBMMTM1LDczMjcuNDYyIEMxMzUsNzMyNy40NjIgMTM2LjI1NSw3MzI1LjI2IDEzOS4wODMsNzMyNS4yNiBDMTQxLjkxMiw3MzI1LjI2IDE0NCw3MzI2Ljk4NiAxNDQsNzMzMC41NTggTDE0NCw3MzM5IEwxNDQsNzMzOSBaIE0xMjYuNDQyLDczMjMuOTIxIEMxMjUuMDkzLDczMjMuOTIxIDEyNCw3MzIyLjgxOSAxMjQsNzMyMS40NiBDMTI0LDczMjAuMTAyIDEyNS4wOTMsNzMxOSAxMjYuNDQyLDczMTkgQzEyNy43OSw3MzE5IDEyOC44ODMsNzMyMC4xMDIgMTI4Ljg4Myw3MzIxLjQ2IEMxMjguODg0LDczMjIuODE5IDEyNy43OSw3MzIzLjkyMSAxMjYuNDQyLDczMjMuOTIxIEwxMjYuNDQyLDczMjMuOTIxIFogTTEyNCw3MzM5IEwxMjksNzMzOSBMMTI5LDczMjYgTDEyNCw3MzI2IEwxMjQsNzMzOSBaIiBpZD0ibGlua2VkaW4tWyNmZmZmZmZdIj4gPC9wYXRoPiA8L2c+IDwvZz4gPC9nPiA8L2c+PC9zdmc+',
            status: 'active',
            created_at: '2025-09-08T16:23:15.000Z',
            updated_at: '2025-09-08T16:23:15.000Z',
        },
        {
            id: '499cfb16-31d3-4a63-b726-5cf2291dc356',
            name: 'Gmail',
            link: 'mailto:kristhdev@gmail.com',
            badge: 'https://img.shields.io/badge/Gmail-EA4335?style=for-the-badge&logo=gmail&logoColor=white',
            status: 'active',
            created_at: '2025-09-08T16:23:15.000Z',
            updated_at: '2025-09-08T16:23:15.000Z',
        }
    ];

    public constructor(
        private readonly apiAdapter: ApiAdapterContract
    ) {}

    public async getAll(): Promise<SocialMediaEntity[]> {
        return this.socialMediaEndpoints.map(SocialMediaEntity.fromEndpoint);
    }
}