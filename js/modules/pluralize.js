export default function pluralize(count, forms, concatCountWithForm = false) {
  let resultForm = count % 10 === 1 && count % 100 !== 11 ? forms[0] : (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20) ? forms[1] : forms[2]);

  if (concatCountWithForm) {
      resultForm = `${count} ${resultForm}`;
  }

  return resultForm;
}
