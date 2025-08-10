mod state;
mod types;
mod token;
mod user;
mod utils;
mod fixed_caller;

use std::collections::HashMap;

use ic_cdk::{ caller, init, post_upgrade, pre_upgrade, storage};
use crate::state::{get_state,save_state};
use crate::types::{TokenState,UserData};
use crate::utils::{convert_from_string_to_principal};



#[pre_upgrade]
fn pre_upgrade() {  
    let state = get_state();
    save_state(state);
}



#[post_upgrade]
fn post_upgrade() {
    let state: TokenState = match storage::stable_restore() {
        Ok((state,)) => state,
        Err(_) => TokenState::default(), 
    };
    
    save_state(state);
}

#[init]
fn init(){

    let minter = caller();

    ic_cdk::println!("Init function called by: {}", ic_cdk::caller());

    let admin_details = UserData{
        name : "Admin".to_string(),
        email : "Admin2005@gmail.com".to_string()
    };

    let mut all_user = HashMap::new();
    all_user.insert(minter.clone(), admin_details);

    let mut all_user_balance = HashMap::new();
    all_user_balance.insert(minter.clone(),70000);

    let id1 = convert_from_string_to_principal("7cq2u-thwov-4sksz-vxybm-dutsq-jjcm2-bc3hw-rfion-6wsnj-djqxn-iqe".to_string());
    all_user.insert(id1.clone(),UserData{name : "Random1".to_string(), email : "random1times2@gmail.com".to_string()});
    all_user_balance.insert(id1.clone(),3000);

    let id2 = convert_from_string_to_principal("io72l-x3irj-jelod-7lz6h-upeoe-gwaza-xwdjt-ln56k-onrlt-bbugx-tae".to_string());
    all_user.insert(id2.clone(),UserData{name : "user2".to_string(), email : "user2user201@gmail.com".to_string()});
    all_user_balance.insert(id2.clone(),21000);

    let id3 = convert_from_string_to_principal("geesk-6dgan-odtj7-jwcoz-rgn3j-ykrol-pxo7i-tcpmc-xrihz-fyprf-sqe".to_string());
    all_user.insert(id3.clone(),UserData{name : "user3".to_string(), email : "user3user302@gmail.com".to_string()});
    all_user_balance.insert(id3.clone(),6000);



    let state = TokenState {
        total_supply: 100000,
        all_user: all_user,
        all_users_balance : all_user_balance,
        minting_account: Some(minter),  
    };

    save_state(state);

}