export const formatRating = (rating) => {
  if (!rating || rating === 'N/A') return 'N/A';
  
  // If it's a percentage or something like "8.8/10" or "88/100", parse it
  const stringRating = String(rating).trim();
  
  if (stringRating.includes('/')) {
    const parts = stringRating.split('/');
    const val = parseFloat(parts[0]);
    const total = parseFloat(parts[1]);
    if (!isNaN(val) && !isNaN(total)) {
      if (total === 10) return val.toFixed(1);
      if (total === 100) return (val / 10).toFixed(1);
      return val.toFixed(1);
    }
  }
  
  const parsed = parseFloat(stringRating);
  return isNaN(parsed) ? rating : parsed.toFixed(1);
};
