// Matches the bucket options in PaymentsToolbar's amount filter.
// `range` is one of: 'all' | 'under25' | '25to50' | '50to100' | 'over100'.
export function isWithinAmountRange(amount, range) {
  switch (range) {
    case 'under25':
      return amount < 25000;
    case '25to50':
      return amount >= 25000 && amount < 50000;
    case '50to100':
      return amount >= 50000 && amount < 100000;
    case 'over100':
      return amount >= 100000;
    case 'all':
    default:
      return true;
  }
}
