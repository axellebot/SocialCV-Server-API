'use strict';

import { Messages } from '../constant';
import { DataResponse } from './DataResponse';

export class UpdateDocumentResponse<T> extends DataResponse {
  constructor(document: T) {
    super(document, Messages.MESSAGE_SUCCESS_RESOURCE_UPDATED);
  }
}
