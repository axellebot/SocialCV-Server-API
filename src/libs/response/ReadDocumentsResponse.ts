'use strict';

import { DataResponse } from '.';

export class ReadDocumentsResponse<T> extends DataResponse {
  total?: number;

  constructor(documents: T[], total: number) {
    super(documents);
    this.total = total;
  }
}
