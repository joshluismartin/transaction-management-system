require "csv"

class TransactionsController < ApplicationController
  CSV_FILE_PATH = Rails.root.join("db", "transactions.csv")

  def index
    transactions = []

    CSV.foreach(CSV_FILE_PATH, headers: true) do |row|
    transactions << {
      transaction_date: row["Transaction Date"],
      account_number: row["Account Number"],
      account_holder_name: row["Account Holder Name"],
      amount: row["Amount"],
      status: row["Status"]
    }
    end

    render json: transactions
  rescue => e
    reneder json: { error: e.message }, status: :internal_server_error
  end


  def create
    transaction_date = params[:transaction_date]
    account_number = params[:account_number]
    account_holder_name = params[:account_holder_name]
    amount = params[:amount]

    status = [ "Pending", "Settled", "Failed" ].sample

    CSV.open(CSV_FILE_PATH, "a+") do |csv|
      csv << [ transaction_date, account_number, account_holder_name, amount, status ]
    end

    new_transaction = {
      transaction_date: transaction_date,
      account_number: account_number,
      account_holder_name: account_holder_name,
      amount: amount,
      status: status
    }

    render json: new_transaction, status: :created
  rescue => e
    render json: { error: e.message }, status: :unprocessable_entity
  end
end
