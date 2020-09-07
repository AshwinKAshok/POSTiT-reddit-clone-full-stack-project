import React from 'react';
import HeadingGeneric from "../components/generics/HeadingGeneric.Component"

export default () => (
	<div className="container">

		{localStorage.setItem('displayPrivacy', false)}

		<HeadingGeneric text="Privacy Policy" />

		<div className="container h4">
			<p>
				&emsp; Welcome to our website. We are a forum of discussion where signed, registered users post about whatever is on their minds. Other authenticated users can directly comment on any post, as well as save these posts into parent collections which are maintained by multiple users. Anyone can see an individual users’ collections, posts, comments, as well as his/her username & real name. The only restriction we enforce in the flow of information is that people must be authenticated in order to create material, e.g. posts, comments, likes, dislikes, and collections.
			</p>
			<p>
				&emsp; In this privacy policy, we notify customers about what they consent to by using this website. The best way to understand the privacy norms of this website is to consider our offline counterpart: a public forum of discussion where people share and discuss ideas openly and freely. While doing so, people consent to being recorded and knowingly subject themselves to other people’s thoughts and opinions.
			</p>
			<p>
				&emsp; Anonymous users are not significantly tracked– we only check if they have visited our website before in order to display this privacy policy page. Registered users, however, must be comfortable displaying their first & last names as they help ensure a nontoxic environment where content creators are personally held accountable for their material. We also keep a private record of registered users’ DOB, address, and phone number. This information is crucial for our team in case we need to reach out with questions or concerns, or if we need to confirm whether certain users are not bots. These are essential measures to preserve the integrity of our platform.
			</p>
			<p>
				&emsp; We also keep track of users’ content history in our website, including posts, comments, and collections that each user created or contributed. This data drives our core features, including the free dissemination of ideas. We reserve the right to track which domains users are more active in, e.g. certain people might prefer ‘Animal’ categories while others are more active on ‘Cars’.  This data can aid the monetization of our website by sharing it with advertising agencies, helping users receive more relevant ads based on their content history.
			</p>
			<p>
				&emsp; In no circumstance will we ever share users’ personal data, including DOB, address, and phone records, as those are only to be used in extenuating circumstances (such as verifying if an account is a bot). However, there is an unavoidable tension between collecting users’ content history and sharing it with advertisement agencies. This data must be protected if we want to encourage further interaction with our platform, but we also need to share some of it if we hope to sustain our website. We are committed to finding and maintaining the perfect balance that meets our needs, while still providing a quality service where people can express themselves without worry or doubt. To this end, users can opt-out of this service if they are uncomfortable with our privacy policy.
			</p>
		</div>
	</div>
)
