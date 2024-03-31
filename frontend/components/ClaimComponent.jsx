export default function ClaimComponent({id, description, amount, approved, rejected}){
    return (
        <div key={index} className="claim">
            <div className='claim-details'>
                <h3><code>Claim {id}</code></h3>
                <p><code>Description: {description}</code></p>
                <p><code>Amount: ${amount}</code></p>
                <p><code>Status: {approved ? "Approved" : rejected ? "Rejected" : "Pending"}</code></p>
            </div>
        </div>
    )
}