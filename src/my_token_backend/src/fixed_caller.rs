use candid::Principal;

/// Always returns the fixed principal you want instead of the real caller().
pub fn fixed_caller() -> Principal {
    Principal::from_text(
        "i5vna-mxnmd-sjous-4oqda-c4ure-6vjhv-kobsp-owbur-72k7t-x4xdl-jqe"
    ).expect("Invalid principal format")
}
