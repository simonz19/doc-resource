# version type

## Alpha

The alpha phase of the release life cycle is the first phase to begin software testing (alpha is the first letter of the Greek alphabet, used as the number 1). In this phase, developers generally test the software using white-box techniques. Additional validation is then performed using black-box or gray-box techniques, by another testing team. Moving to black-box testing inside the organization is known as alpha release

## Beta

Beta, named after the second letter of the Greek alphabet, is the software development phase following alpha. Software in the beta stage is also known as betaware. Beta phase generally begins when the software is feature complete but likely to contain a number of known or unknown bugs. Software in the beta phase will generally have many more bugs in it than completed software, as well as speed/performance issues and may still cause crashes or data loss. The focus of beta testing is reducing impacts to users, often incorporating usability testing. The process of delivering a beta version to the users is called beta release and this is typically the first time that the software is available outside of the organization that developed it. Beta version software is often useful for demonstrations and previews within an organization and to prospective customers. Some developers refer to this stage as a preview, preview release, prototype, technical preview / technology preview (TP), or early access. Some software is kept in perpetual beta, where new features and functionality are continually added to the software without establishing a firm "final" release.

## Snapshot and Release

A snapshot version in Maven is one that has not been released.

The idea is that before a 1.0 release (or any other release) is done, there exists a 1.0-SNAPSHOT. That version is what might become 1.0. It's basically "1.0 under development". This might be close to a real 1.0 release, or pretty far (right after the 0.9 release, for example).

The difference between a "real" version and a snapshot version is that snapshots might get updates. That means that downloading 1.0-SNAPSHOT today might give a different file than downloading it yesterday or tomorrow.

Usually, snapshot dependencies should only exist during development and no released version (i.e. no non-snapshot) should have a dependency on a snapshot version.

## Release Candidate [RC]

Release candidate. A release candidate (RC), also known as "going silver", is a beta version with potential to be a final product, which is ready to release unless significant bugs emerge.

Release Candidate (RC) is the build released internally to check if any critical problems have gone undetected into the code during the previous development period. Release candidates are NOT for production deployment, but they are for testing purposes only.
