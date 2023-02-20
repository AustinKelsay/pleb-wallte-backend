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
          send: false,
        },
        {
          payment_request:
            "lnbcrt2u1p3l8ht4pp59aun8denxm647xns2vzxm3l64uwqh30gua70s82v9g5qu77p7e4qdqqcqzpgxqyz5vqsp52z3c5n26a83cg27uhhjdzddpl7lsqycxn06n4t3de3n2yjk5mm3q9qyyssqus20cz57lhajpuzja4hl3xwkq8hv4uetcyueh5kvhvs62r8r4as86ms4xu33qq9r7yuan9uvnjd6dfjel4jkumfuknmg5wxyqpkal6qqqs0ajh",
          value: 100,
          fees: 10,
          send: true,
          settled: true,
          settle_date: Date.now(),
        },
      ]);
    });
};
