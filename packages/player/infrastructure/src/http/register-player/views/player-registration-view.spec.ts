import type { PlayerRegistrationViewModel } from '@player/interface-adapters/view-models';
import type { Renderer } from '@shared/infrastructure';
import { describe, expect, it } from 'vitest';
import type { HttpPlayerRegistrationResponse } from '../responses';
import { HttpPlayerRegistrationView } from './player-registration-view';

describe(HttpPlayerRegistrationView, () => {
  it("renders 201 empty http response if view model is { status: 'SUCCESS' }", () => {
    const viewModel: PlayerRegistrationViewModel = { status: 'SUCCESS' };
    let renderedResponse: HttpPlayerRegistrationResponse | null = null;
    const fakeRenderer: Renderer<HttpPlayerRegistrationResponse> = (
      response: HttpPlayerRegistrationResponse,
    ) => {
      renderedResponse = response;
    };
    const view = new HttpPlayerRegistrationView(fakeRenderer);

    view.render(viewModel);

    expect(renderedResponse).toStrictEqual({ statusCode: 201, body: {} });
  });

  it("renders 422 http response with NICKNAME_TOO_SHORT reason  if view model is { status: 'FAILURE', rejectionReason: 'NICKNAME_TOO_SHORT' }", () => {
    const viewModel: PlayerRegistrationViewModel = {
      status: 'FAILURE',
      rejectionReason: 'NICKNAME_TOO_SHORT',
    };
    let renderedResponse: HttpPlayerRegistrationResponse | null = null;
    const fakeRenderer: Renderer<HttpPlayerRegistrationResponse> = (
      response: HttpPlayerRegistrationResponse,
    ) => {
      renderedResponse = response;
    };
    const view = new HttpPlayerRegistrationView(fakeRenderer);

    view.render(viewModel);

    expect(renderedResponse).toStrictEqual({
      statusCode: 422,
      body: {
        rejectionReason: 'NICKNAME_TOO_SHORT',
      },
    });
  });
});
