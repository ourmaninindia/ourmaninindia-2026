---
categories : ["open-source"]
date : 2018-04-23T14:25:12Z
description : "Delete @eaDIR folders on your Synology NAS"
tags : ["open-source"]
title : "Delete @eaDIR folders"
---

These are index folders, the presence of which can be quite annoying.

To locate them

<pre>find . -type d -name "@eaDir"</pre>

if you’re feeling ok about automatically deleting them then:

<pre>find . -type d -name "@eaDir" -print0 | xargs -0 rm -rf</pre>

On a Synology NAS you can disable feature as follows
<pre>synoservice --disable pkgctl-SynoFinder</pre>
<i>warn: The runkey of service \[pkgctl-SynoFinder\] has been set to "No"</i>