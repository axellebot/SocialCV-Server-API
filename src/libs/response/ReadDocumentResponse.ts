'use strict';

import { DataResponse } from '.';

export class ReadDocumentResponse<T> extends DataResponse {
  constructor(document: T) {
    super(document);
  }
}
