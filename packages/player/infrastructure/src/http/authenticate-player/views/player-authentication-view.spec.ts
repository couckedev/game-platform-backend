import type { PlayerAuthenticationViewModel } from '@player/interface-adapters/view-models';
import type { Renderer } from '@shared/infrastructure';
import { describe, expect, it } from 'vitest';
import type { HttpPlayerAuthenticationResponse } from '../responses';
import { HttpPlayerAuthenticationView } from './player-authentication-view';

describe(HttpPlayerAuthenticationView, () => {
  it('renders 200 http response containing found nickname if view model status is FOUND', () => {
    const viewModel: PlayerAuthenticationViewModel = {
      status: 'FOUND',
      nickname: 'nickname',
    };
    let renderedResponse: HttpPlayerAuthenticationResponse | null = null;
    const fakeRenderer: Renderer<HttpPlayerAuthenticationResponse> = (
      response: HttpPlayerAuthenticationResponse,
    ) => {
      renderedResponse = response;
    };
    const view = new HttpPlayerAuthenticationView(fakeRenderer);

    view.render(viewModel);

    expect(renderedResponse).toStrictEqual({
      statusCode: 200,
      body: { nickname: viewModel.nickname },
    });
  });
});
