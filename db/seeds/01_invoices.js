exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("invoices")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("invoices").insert([
        {
          payment_request:
            "lnbcrt1u1p3lzwprpp59xlnhnwq3wxtyx6qnafj8jrvrvhdw9u36kmyl5hpnszx56mvnu0sdqy09hscqzpgxqyz5vqsp5ca9cd34nd4qyhz38g2x9944wyznqfaym05xgag878axu9n4zs65q9qyyssqscpk9yq7kk9477v9ju0zxdead34xwzgq88usvpnm04mjepzutz88tzcl7dmatyfu88t275vfh8yruq5s2zerywkhgtlnukx0apy85vqqdkgnw5",
          memo: "yo",
          value: 100,
          settled: false,
        },
      ]);
    });
};
