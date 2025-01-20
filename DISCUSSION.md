# Bugs

1. The search does not work with numbers. This is due to the integers being too large for an integer type. I would have like to have fixed this, but did not to respect the time constraints.

# Other improvements

## Database

1. The database setup could be automated. I generally use ephemeral containers to run database migration and seeding, that felt a little out of scope for a 2hr time limit. This could greatly ease local development into a single command.
1. I'm not a fan of `jsonb` columns for use with arrays in databases. With more time, I would have created another table with a serial ID and descriptions for each specialty. As it stands, the `jsonb` column results in a large amount of repeated text that bloats the database unnecessarily, and complicates queries such as, "Find all advocates that specialize in Bipolar".

## Frontend

1. I would highly recommend the use of tanstack libraries. In particular, Tanstack Table, and Tanstack Virtualize. This PR doesn't optimize the frontend experience very much, so that could be used to optimize for large numbers of results in the response.
1. The Specialties list doesn't look very nice. I added bullet points to make it a bit more legible, but ultimately the mass of points in that column makes it difficult to read. I'm not certain what I would put here, and would need to do some user studies to understand the purpose of this column.
   - For example, I imagine most users will be looking for a particular specialty. In that case, I would limit the search one (or a few) specialties at a time.
   - Otherwise, if this is being used to find general purpose advocates, I would consider a chart with checkmarks. That may need some design work to shorten the titles for specialties, however.

## Backend

1. There isn't an auth layer at present. This would certainly be overkill for the project, but that would be one of my first goals in a production environment. Auth.js is a good option for this.
1. I do prefer the use of Next.js server actions, but understand that it was a strict requirement to not use them for this task. They generally help with delivering quick results; when they act similar to RPC/function calls.
1. The one fetch function should include pagination parameters. I didn't get to this due to a lack of time. This would be critical with a large number of results. This should be paired with Tanstack table/virtual from the suggestion in Frontend.
