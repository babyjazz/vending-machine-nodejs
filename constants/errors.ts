const errorMessages = {
  invalidCredential: () => 'invalid_credential',
  notFound: (field: string) => `${field}_not_found`,
  mustBeInt: (field: string) => `${field}_must_be_number`,
  isRequired: (field: string) => `${field}_is_required`,
  isEmpty: (field: string) => `${field}_is_empty`,
  outOfStock: (field: string) => `${field}_out_of_stock`,
}

export default errorMessages
