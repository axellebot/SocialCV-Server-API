'use strict';

import { DataResponse } from '.';
import { Messages } from '../constant';

export class UpdateDocumentsResponse<T> extends DataResponse {
  constructor(documents: T[]) {
    super(documents, Messages.MESSAGE_SUCCESS_RESOURCE_UPDATED);
  }
}
